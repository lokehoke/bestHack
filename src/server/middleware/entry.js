'use strict';

const path = require('path');
const crypto = require('crypto');
const config = require('config');

class AuthMiddlewares{
    constructor(authObj){
        this.auth = authObj;
    }

    //Check cookie and redirect to main if the user is registered and not blocked or deleted
    //Redirect to /admin if user is an admin and he is not already on /admin route
    //Else call next middleware
    async as_cookieCheck(req, res, next) {
        if(!req.signedCookies['user'] && req.path !== '/auth' && req.path !== '/register') {
            return res.redirect('/auth');
        }

        else{
            try {
                const cookie = req.signedCookies;
                const user_status = await this.auth.as_CookieAuth(cookie);
                if (user_status) {
                    if(user_status === 'admin'){
                        if(req.path !=='/admin'){
                            res.redirect('/admin');
                        }
                        else{
                            return next();
                        }
                    }
                    //user_status = user
                    else{
                        if(req.path !== '/main'){
                            res.redirect('/main');
                        }
                        else{
                            return next();
                        }
                    }
                } else {
                    res.clearCookie('user', { httpOnly: false });
                    return next();
                }
            }
            catch(err){
                //Executed when there's no cookie or it's corrupted
                res.clearCookie('user', { httpOnly: false });
                return next();
            }
        }
    }

    //Check cookies if correct send to the next middlewares with fetched user data
    //another way call error handling middleware
    async as_APIcookieCheck(req, res, next){
        const email = req.signedCookies['user'];
        if(!email) {
            return next(new Error(`You couldn't access api without auth cookies, try /auth or /register`));
        }
        else{
            try {
                const user_obj = await this.auth.db.as_getUser(email);
                if (user_obj) {
                    req.user = user_obj;
                    return next();
                }
                else{
                    res.clearCookie('user', { httpOnly: false });
                    console.log(`${user_obj.email} passed cookies for not existing user!`);
                    return next(new Error(`Incorrect auth data`));
                }
            }
            catch(err){
                //Executed when there's no cookie or it's corrupted
                res.clearCookie('user', { httpOnly: false });
                return next(new Error("Something is wrong!"));
            }
        }
    }

    static sendIndex(req, res) {
        res.sendFile('index.html', { root: path.join(__dirname, '../public') });
    }

    async as_getAll(req, res, next){
        try {
            if (req.user.role === 1) {
                const result = [];
                const allUsers = await this.auth.db.as_getAllUsers();
                for(let i = 0; i < allUsers.length; ++i){
                    const userCodes = await this.auth.db.as_getCodesOfUserId(allUsers[i].id);
                    allUsers[i].codes = userCodes;
                    result.push(allUsers[i]);
                }
                req.allData = result;
                return next();
            }
            else {
                return next(new Error('Permission denied!'));
            }
        }
        catch(err){
            return next(new Error('Failed!'));
        }
    }

    async as_getAllUsers(req, res, next) {
        try {
            if (req.user.role === 1) {
                req.allData = await this.auth.db.as_getAllUsers();
                return next();
            } else {
                return next(new Error('Permission denied!'));
            }
        }
        catch(err){
            return next(new Error('Failed!'));
        }
    }

    static sendUserObject(req, res) {
        req.user.pass = undefined;
        req.user.alg = undefined;
        req.user.count_hash = undefined;
        req.user.salt = undefined;

        res.status(200).json(req.user);
    }

    static checkJSONHeader(req, res, next){
        if (!req.is('json')) {
            next(new Error(`Content-Type of HTTP header must be 'application/json'`));
        }
        else{
            next();
        }
    }

    //Checking json body email and password for correct! If it is pass to the next middleware
    //if is not pass to the error handling middleware
    static checkAuthBody(req, res, next) {
            if (!req.body.email || !req.body.password) {
                next(new Error('Incorrect POST request!'));
            }

            else {
                next();
            }
    }

    async as_checkAuth(req, res, next) {
            //Get all user info in database if there's no info we throw Error to error handler middleware to handle
            //If we have info we extract his hash algorithm and then we're hashing password.
            try {
                const {email, password} = req.body;
                const user_info = await this.auth.db.as_getUser(email);
                if (user_info.length === 0) {
                    next(new Error('Login or password is invalid!'));
                } else {
                    const hash_algo = user_info.alg;
                    const hash = crypto.pbkdf2Sync(password, user_info.salt, user_info.count_hash, 32, hash_algo).toString('hex');
                    //If the hash match next route
                    if (hash === user_info.pass && !user_info.is_blocked && !user_info.is_deleted){
                        console.log(`User ${req.body.email} is logged in`);
                        next();
                    } else {
                        console.error("Password match is failed or user is deleted");
                        next(new Error("Login or password is invalid or user is deleted!"));
                    }
                }
            } catch (err) {
                console.error("Login is incorrect we didn't find anything!");
                next(new Error('Login or password is invalid!'));
            }
    }

    //Middleware check for user exist in the database if it is we'll throw
    //error to the handling error middleware else go to the next middleware
    async as_checkUserExist(req, res, next){
        try{
            const email = req.body.email;
            //If the user is in database we go to sending cookie
            if(await this.auth.as_DBUserMatch(email)){
                next(new Error(`The user is already exist!`));
            }
            else{
                next();
            }
        }
        catch(err){
            next(err);
        }
    }


    async as_deleteCodeByUUID(req, res, next){
        try{
            if(!req.params.UUID){
                return next(new Error('Empty UUID was passed!'));
            }
            //If admin
            if(req.user.role === 1) {
                await this.auth.db.as_deleteCodeByUUID(req.params.UUID);
                return next();
            }
            //If user
            else {
                const UUIDArr = await this.auth.db.as_getUUIDByUser(req.user.email);
                if(req.params.UUID in UUIDArr){
                    await this.auth.db.as_deleteCodeByUUID(req.params.UUID);
                    return next();
                }
                else{
                    return next(new Error('Access denied'));
                }
            }
        }
        catch(err){
            next(new Error('Failed!'));
        }
    }

    async as_getCodeByUUID(req, res, next){
        try{
            if(!req.params.UUID){
                return next(new Error('Empty UUID was passed!'));
            }
            //If admin
            if(req.user.role === 1){
                const codeInfo = await this.auth.db.as_GetCodeByUUID(req.params.UUID);
                if(codeInfo) {
                    req.code = codeInfo.code;
                    req.name = codeInfo.name;
                    next();
                }
                else{
                    return next(new Error(`Code by this UUID wasn't found!`));
                }
            }
        }
        catch(err){
            return next(new Error('Failed!'));
        }
    }

    //Add user to the database and calculating hash for him. We don't check for database coincidence with the same email!
    async as_registerUser(req, res, next){
        try{
            const {email, password} = req.body;
            const hash_algo = config.hash.algorithm;
            const iterations = Math.floor(Math.random() * Math.floor(config.hash.max_iter));
            const keylen = config.hash.keylen;
            const salt = Math.random().toString(36).substr(1, 4);
            const hash = crypto.pbkdf2Sync(password, salt, iterations, keylen, hash_algo).toString('hex');


            await this.auth.db.as_addUser({ email: email, is_blocked: false, is_deleted: false, role: 2, pass: hash, salt: salt, count_hash: iterations, alg: 1 });
            next();

        }
        catch(err){
            next(err);
        }
    }

    //If the admin return UUID's of every person
    //If the user return only his own UUID's in spite of his email request
    async as_getUUIDForUser(req, res, next){
        try{
            if(!req.params.user) {
                next(new Error(`Email should'nt be empty!`));
            }
            const status = (req.user.role === 1 ? 'admin' : 'user');
            if(status === 'admin'){
               req.UUID = (await this.auth.db.as_getUUIDByUser(req.params.user)).map((e) => e.id);
               return next();
            }
            //status = user
            else{
                if(req.params.user === req.user.email){
                    req.UUID = (await this.auth.db.as_getUUIDByUser(req.params.user)).map((e) => e.id);
                    return next();
                }
                //Incorrect passed user - permission denied
                else{
                    return next(new Error('Permission denied!'));
                }
            }
        }
        catch(err){
            return next(new Error('Failed!'));
        }

    }

    static setCookie(req, res, next){
        const email = req.body.email;
        res.cookie('user',
                    email,
                  { signed: true,
                    httpOnly: false,
                  });
        next();
    }

    static sendOk(req, res){
        res.status(200);
        res.json({ message: "Successful action!"});
    }

    async as_getCodeStatusByUUID(req, res, next){
        if(!req.params.UUID) {
            return next(new Error(`UUID shouldn't be empty!`));
        }
        else {
            try {
                const code = await this.auth.db.as_GetCodeByUUID(req.params.UUID);
                if(code.code && code.name){
                    return next();
                }
                else{
                    return next(new Error('Failed or not uploaded!'));
                }
            } catch (err) {
                return next(new Error('Failed or not uploaded!'));
            }
        }
    }

    //Save code and return UUID
    async as_saveCode(req, res, next){
        try {
            req.UUID = await this.auth.db.as_setCode(req.body.code, req.user.id, req.compiled.name);
            return next();
        }
        catch(err){
            next(err);
        }
    }

}

/*
Export this to the tests please
const DBpg = require('../db/DBpg');
async function exec() {
    const some = config.db;
    let db = new DBpg(config.db, 'db.pgsql');
    await db.as_connect();
    const salt = Math.random().toString(36).substr(1, 4);
    const hash = crypto.pbkdf2Sync('seregamw1', salt, 3, 32, 'sha256').toString('hex');
    const email = 'sergey.ampo@gmail.com';

    const userObj = { email: email, is_blocked: false, is_deleted: false, role: 2, pass: hash, salt: salt, count_hash: 3, alg: 1 }
    await db.as_addUser(userObj);
}
exec();
*/
module.exports = AuthMiddlewares;

