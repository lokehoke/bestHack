const router = require('./index');
const path = require('path');

const { cookie_check, send_index } = require('../middleware/entry');

//cookie is valid -> /main
//has no cookie -> send index
router.get('/auth',
    cookie_check,
    send_index,
);

module.exports = router;