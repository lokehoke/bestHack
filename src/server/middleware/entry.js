'use strict';

const path = require('path');
const crypto = require('crypto');
const config = require('config');

class AuthMiddlewares{
    constructor(authObj){
        this.auth = authObj;
    }

    //
    async as_cookieCheck(req, res, next) {
        if(!req.cookies['user'] && req.path !== '/auth') {
            return res.redirect('/auth');
        }
        else{
            try {
                const cookie = await this.auth.as_isCookieValidAuth(req.signedCookies['user']);
                if (cookie) {
                    //  return res.redirect('/main');
                    console.log("Redirected to main!");
                } else {
                    res.clearCookie('user', {path: req.path});
                }
            }
            catch(err){
                //Executed when there's no cookie or it's corrupted
                res.clearCookie('user', { path: req.path });
            }
        }

        next();
    }

    static sendIndex(req, res) {
        res.sendFile('index.html', { root: path.join(__dirname, '../public') });
    }

    //Checking json body email and password for correct! If it is pass to the next middleware
    //if is not pass to the error handling middleware
    static checkAuthBody(req, res, next) {
        if (!req.is('json')) {
            next(new Error(`Content-Type of HTTP header must be 'application/json'`));
        }
        else {

            if (!req.body.email || !req.body.password) {
                next(new Error('Incorrect POST request!'));
            }

            else {
                next();
            }
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
                    if (hash === user_info.pass) {
                        console.log(`User ${req.body.email} is logged in`);
                        next();
                    } else {
                        console.error("Password match is failed");
                        next(new Error("Login or password is invalid!"));
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

    static setCookie(req, res, next){
        const email = req.body.email;
        res.cookie('user',
                    email,
                  { signed: true,
                    expires: new Date(Date.now() + 900000)
                  });
        next();
    }

    static sendOk(req, res){
        res.status(200);
        res.json({ message: "Successful action!"});
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

