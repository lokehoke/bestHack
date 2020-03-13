'use strict';

const AuthMiddleware = require('../../middleware/entry');

module.exports = (index) => (async function(){
    const { middlewares, router } = index;
    //Check JSON header -> check cookies -> check code -> save code -> send UUID
    router.post('/status',
        AuthMiddleware.checkJSONHeader,
        middlewares.as_APIcookieCheck.bind(middlewares),
        AuthMiddleware.sendUserObject,
    );

    //Error handler
    router.use((err, req, res, next) => {
        console.log(`Error: ${err.message} on data ${JSON.stringify(req.body)}`);
        res.status(400).json({ message: err.message });
    });

    return index;
}());