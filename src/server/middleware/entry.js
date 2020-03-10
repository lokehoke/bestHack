const path = require('path');
const Auth = require('../auth/Auth');

//If no cookies we redirect client to /register page
function cookie_check(req, res, next) {
    if(!req.cookie && req.path !== '/auth') {
       return res.redirect('/auth');
    }
    else{
      const Auth = new Auth;
      Auth.as_isCookieValidAuth(req.signedCookies).
          then((cookie_valid) => {
          if(cookie_valid){
              return res.redirect('/main');
          }
          else{
              res.clearCookie('user', { path: req.path });
              res.statusCode(401).json({ message: "Incorrect cookies were deleted, try /POST!" });
          }
      }).
          catch((err) => {
          //Executed when there's no cookie or it's corrupted
          res.clearCookie('user', { path: req.path });
          res.sendStatus(401).json({ message: "Try /POST!" });
      });
    }

    next();
}

function send_index(req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, '../public') });
}

function check_auth_data(req, res, next){
    if(!req.is('+json'))
        throw new Error(`Content-Type of HTTP header must be 'application/json'`);

    const [login, password] = req.body;
    Auth._as_getHashAlgorithm()
}

module.exports = {
    cookie_check,
    send_index,
};

