'use strict';

const AuthMiddleware = require('../middleware/entry');

//Get the same router and middleware object as in index
module.exports = (index) => (async function(){
    const { middlewares, router } = index;

    //cookie is valid -> /main
    //has no cookie -> send index
    router.get('/auth',
        middlewares.as_cookieCheck.bind(middlewares),
        AuthMiddleware.sendIndex,
    );

    //post is valid -> send ok
    //invalid send error
    router.post('/auth',
        AuthMiddleware.checkAuthBody,
        middlewares.as_checkAuth.bind(middlewares),
        AuthMiddleware.setCookie,
        AuthMiddleware.sendOk,
    );

    return index;
})();



