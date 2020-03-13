'use strict';

const AuthMiddleware = require('../../middleware/entry');
const CodeMiddleware = require('../middleware/code');

module.exports = (index) => (async function(){
    const { middlewares, router } = index;
    //Check JSON header -> check cookies -> check code -> save code -> send UUID
    router.post('/algoCode',
        AuthMiddleware.checkJSONHeader,
        middlewares.as_APIcookieCheck.bind(middlewares),
        CodeMiddleware.codeCheck,
        CodeMiddleware.as_codeCompile,
        CodeMiddleware.isCodeCompiled,
        middlewares.as_saveCode.bind(middlewares),
        CodeMiddleware.sendUUID,
    );

    //Check cookies -> getUUIDForUser
    router.get('/algoCode/:user',
        middlewares.as_APIcookieCheck.bind(middlewares),
        middlewares.as_getUUIDForUser.bind(middlewares),
        CodeMiddleware.sendUUID
    );

    //Check cookies -> collecting all data -> send to admin
    router.get('/allData',
        middlewares.as_APIcookieCheck.bind(middlewares),
        middlewares.as_getAll.bind(middlewares),
        CodeMiddleware.sendAll
    );

    router.delete('/algoCode/:UUID/',
        middlewares.as_APIcookieCheck.bind(middlewares),
        middlewares.as_deleteCodeByUUID.bind(middlewares),
        AuthMiddleware.sendOk,
        );

    router.get('/algoCode/:UUID/code',
        middlewares.as_APIcookieCheck.bind(middlewares),
        middlewares.as_getCodeByUUID.bind(middlewares),
 //       CodeMiddleware.sendCode
        );

    router.get('/algoCode/:UUID')

    //Error handler
    router.use((err, req, res, next) => {
        console.log(`Error: ${err.message} on data ${JSON.stringify(req.body)}`);
        res.status(400).json({ message: err.message });
    });

    return index;
}());