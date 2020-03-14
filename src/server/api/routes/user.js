'use strict';

const CodeMiddleware = require('../middleware/code');

module.exports = (index) => (async function(){
    const { middlewares, router } = index;

    router.get('/user',
        middlewares.as_APIcookieCheck.bind(middlewares),
        middlewares.as_getAllUsers.bind(middlewares),
        CodeMiddleware.sendAll,
    );

    //Error handler
    router.use((err, req, res, next) => {
        console.log(`Error: ${err.message} on data ${JSON.stringify(req.body)}`);
        res.status(400).json({ error: err.message });
    });

    return index;
}());