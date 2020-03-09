const express = require('express');
const router = express.Router();
const path = require('path');

const { cookie_check, send_index } = require('../middleware/entry');

router.get('/',
    cookie_check,
    send_index,
);

module.exports = router;