'use strict';

const AuthMiddleware = require('../middleware/entry');

module.exports = (index) => (async function(){
    const { middlewares, router } = index;

    router.get('/admin',
        middlewares.as_cookieCheck.bind(middlewares),
        AuthMiddleware.sendIndex
    );

    //Error handler
    router.use((err, req, res, next) => {
        console.log(`Error: ${err.message} on data ${JSON.stringify(req.body)}`);
        res.status(400).json({ error: err.message });
    });

    return index;
}());