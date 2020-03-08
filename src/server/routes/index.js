var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send('index.html', { root: __dirname });
});

module.exports = router;
