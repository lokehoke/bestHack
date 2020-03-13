'use strict';

const AuthMiddleware = require('../middleware/entry');

module.exports = (index) => (async function(){
    const { middlewares, router } = index;

    router.get('/register',
        middlewares.as_cookieCheck.bind(middlewares),
        AuthMiddleware.sendIndex
    );


    router.post('/register',
      AuthMiddleware.checkJSONHeader,
      AuthMiddleware.checkAuthBody,
      middlewares.as_checkUserExist.bind(middlewares),
      middlewares.as_registerUser.bind(middlewares),
      AuthMiddleware.setCookie,
      AuthMiddleware.sendOk
    );


    return index;
}());