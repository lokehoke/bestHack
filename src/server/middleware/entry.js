'use strict';

const path = require('path');
const crypto = require('crypto');

class AuthMiddlewares{
    constructor(authObj){
        this.auth = authObj;
    }

    async as_cookieCheck(req, res, next) {
        if(!req.cookie && req.path !== '/auth') {
            return res.redirect('/auth');
        }
        else{
            try {
                const cookie = await this.auth.as_isCookieValidAuth(req.signedCookies);
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

    async as_checkAuthData(req, res, next) {
        if (!req.is('json')) {
            next(new Error(`Content-Type of HTTP header must be 'application/json'`));
        }
        const {email, password} = req.body;

        //Get all user info in database if there's no info we throw Error to error handler middleware to handle
        //If we have info we extract his hash algorithm and then we're hashing password.
        try {
            const user_info = await this.auth.db.as_getUser(email);
            if(user_info.length === 0) {
                next(new Error("Login or password is invalid!"));
            }
            else{
               const hash_algo = user_info.alg;
                const hash = crypto.pbkdf2Sync(password, user_info.salt, user_info.count_hash, 32, hash_algo).toString('hex');
                //If the hash match next route
                if (hash === user_info.pass) {
                    next();
                } else {
                    console.error("Password math is failed");
                    next(new Error("Login or password is invalid!"));
            }
        }
        }
        catch(err){
            console.error("Login is incorrect we didn't find anything!");
            next(new Error('Login or password is invalid!'));
        }

    }

    static setCookie(req, res, next){
        const email = req.body.email;
        res.cookie('user', email, { signed: true });
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

