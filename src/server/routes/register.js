'use strict';

const AuthMiddleware = require('../middleware/entry');

module.exports = (index) => (async function(){
    const { middlewares, router } = index;

    //router.get('/register')

    router.post('/register',
      AuthMiddleware.checkAuthBody,
      middlewares.as_checkUserExist.bind(middlewares),
      middlewares.as_registerUser.bind(middlewares),
      AuthMiddleware.setCookie,
      AuthMiddleware.sendOk
    );

    //Error handler
    router.use((err, req, res, next) => {
        console.log(`Error: ${err.message} on data ${JSON.stringify(req.body)}`);
        res.status(400).json({ error: err.message });
    });

    return index;
}());