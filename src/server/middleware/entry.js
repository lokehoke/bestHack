const path = require('path');

//If no cookies we redirect client to /register page
function cookie_check(req, res, next) {
    if(!req.cookie && req.path !== '/auth') {
       return res.redirect('/auth');
    }
    //else if(cookie is valid)
      //res.redirect('/main');

    next();
}

function send_index(req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, '../public') });
}

module.exports = {
    cookie_check,
    send_index,
};

