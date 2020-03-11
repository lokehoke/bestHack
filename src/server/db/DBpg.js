'use strict';

const { Client } = require('pg');
const fs = require('mz/fs');
const path = require('path');

/**
 * @description Database class which can initialize tables and work with queriesa
 */
class DBpg{
    constructor(config, filename){
        this.db = new Client(config);

        if(filename) {
            fs.readFile(path.join(__dirname, "../../", "db", filename)).
                then((data) => {
                    this.dump = data.toString();
                    console.log("The dump file was read");
            }).
                catch((err) => { console.error(err) })
        }
    }

    async as_connect(){
        try{
            await this.db.connect();
        }
        catch(e) { console.error(e); }
    }

    async as_init(){
        await this.db.query(this.dump);
    }

    /**
     *
     * @param login - email to find
     * @returns {Promise<void>} object with user information
     */
    async as_getUser(login){
        const user_info = await this.db.query('SELECT users.id, users.email, users.pass, users.salt, users.count_hash, users.role, users.is_blocked,' +
            ' hash_algorithms.name AS alg FROM users' +
            ' JOIN hash_algorithms ON hash_algorithms.id = users.alg ' +
            'WHERE users.email = $1', [login]);
        return user_info.rows[0];
    }

    async as_addUser(userObj) {
        await this.db.query('INSERT INTO users (email, is_blocked, is_deleted, role, pass, salt, count_hash, alg) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', Object.values(userObj));
        console.log(`User with username: ${userObj.email} were successfully added to the database!`);
    }



    async close(){
        this.db.end();
    }
}

module.exports = DBpg;

//const config = require('config');

/*async function exec() {
    let db = new DBpg(config.db, 'db.pgsql');
    await db.as_connect();
    await db.as_init();
}

exec();*/