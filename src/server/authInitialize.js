'use strict';

const DBpg = require('./db/DBpg');
const Auth = require('./auth/Auth');

//Initialize db and Auth
async function authInitialize(db_cfg){
  let db = new DBpg(db_cfg);
  try {
    await db.as_connect();
    return new Auth(db);
  }
  catch(err) {
    console.error(err);
  }
}

module.exports = authInitialize;