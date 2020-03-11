'use strict';

class Auth {
    /**
     *
     * @param db - DBpg class object with prepared connection to the database
     */
    constructor(db) {
        this.db = db;
    }

    /**
     * @description Check if the cookie can authorize the user
     * @param cookie - express.req.signedCookies object
     * @returns {Promise<void>} - returns if the authorization success with `cookie`
     */
    async as_isCookieValidAuth(cookie) {
        const login = cookie.user;
        if (!login) {
            throw new Error('Cookie is invalid!');
        }
        else{
          try{
              return await this.db.as_DBUserMatch(login);
          }
          catch(e){
              console.error(e);
              return false;
          }
        }
    }

    /**
     *
     * @param email
     * @returns {Promise<boolean>} The result of login match for this user.
     * @private
     */
    async as_DBUserMatch(email) {
        try {
            const user_info = await this.db.as_getUser(email);
            return !!user_info;
        }
        catch (e) {
            throw e;
        }
    }
}

module.exports = Auth;
