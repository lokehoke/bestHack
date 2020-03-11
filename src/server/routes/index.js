'use strict';

const express = require('express');
const router = express.Router();
const config = require('config');
const authInitialize = require('../authInitialize');

const AuthMiddleware = require('../middleware/entry');

//export async IIFE
module.exports = () => (async function() {
    //Initialize main entry middleware
    const auth = await authInitialize(config.db);
    let middlewares = new AuthMiddleware(auth);

    router.get('/',
        middlewares.as_cookieCheck.bind(middlewares),
        AuthMiddleware.sendIndex,
    );

    return {router, middlewares};
})();