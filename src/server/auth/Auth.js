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
    async as_CookieAuth(cookie) {
        const cookieUser = cookie['user'];
        if (!cookieUser) {
            throw new Error('Cookie is invalid!');
        }
        else{
          try{
              const user_info = await this.db.as_getUser(cookie['user']);
              if(!user_info){
                  return undefined;
              }
              else if(user_info.email === cookie['user']){
                  if(user_info.is_blocked || user_info.is_deleted){
                      return undefined;
                  }
                  return (user_info.role === 1 ? 'admin' : 'user');
              }
              else{
                  return undefined;
              }
          }
          catch(e){
              console.log(e);
              return undefined;
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
