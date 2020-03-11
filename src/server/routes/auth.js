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
        middlewares.as_checkAuthData.bind(middlewares),
        AuthMiddleware.sendOk,
    );

    //Error handler
    router.use((err, req, res, next) => {
        console.log(`Error: ${err.message} on data ${JSON.stringify(req.body)}`);
        res.status(400).json({ error: err.message });
    });

    return index;
})();



