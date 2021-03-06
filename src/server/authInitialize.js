'use strict';

const dbDump = process.env.DBDUMP || true;

const DBpg = require('./db/DBpg');
const Auth = require('./auth/Auth');
const config = require('config');

//Initialize db and Auth
async function authInitialize(db_cfg){
  let db = new DBpg(db_cfg, config.dumpName);
  try {
    await db.as_connect();
    if(!dbDump) {
      await db.as_init();
      console.log(`Database is successfully fulfilled!`);
    }
    return new Auth(db);
  }
  catch(err) {
    console.error(err);
  }
}

module.exports = authInitialize;
