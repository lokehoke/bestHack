'use strict';

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

/**
 * @description Database class which can initialize tables and work with queriesa
 */
class DBpg{
    constructor(config, filename){
        this.db = new Client(config);
        if(filename) {
            try {
                const data = fs.readFileSync(path.join(__dirname, '../../', 'db', filename));
                this.dump = data.toString();
                if(this.dump){
                    console.log(`Dump file is successfully read it's size if ${this.dump.length}`);
                }
            }
            catch(err){
                console.log(`Error on file read stage ${err}`);
            }
        }
    }

    async as_connect(){
        try{
            await this.db.connect();
        }
        catch(e) { console.log(`We couldn't connect to the database and error is: ${e}`); }
    }

    async as_init(){
        try {
            console.log(`Try to put database file into with size ${this.dump.length}`);
            await this.db.query(this.dump);
        }
        catch(e) { console.error(`Database cannot be restored the size of the dumpfile is ${this.dump.legnth} and the error is: ${err}`); }
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

    //Save code to the database and return UUID of it
    async as_setCode(code, user_id, name){
        const UUID = await this.db.query('INSERT INTO code (code, is_deleted, id_user, name) VALUES ($1, false, $2, $3) RETURNING id', [code, user_id, name]);
        return UUID.rows[0].id;
    }

    async as_getUUIDByUser(email){
        const UUIDS = await this.db.query('select\n' +
            '\tcode.id\n' +
            'from\n' +
            '\tcode\n' +
            'join\n' +
            '\tusers\n' +
            'on\n' +
            '\tcode.id_user = users.id\n' +
            'where\n' +
            '\t\ $1 = users.email\n', [email]);
        return UUIDS.rows;
    }

    async as_getAllUsers(){
        return (await this.db.query('SELECT users.email, users.id FROM users')).rows;
    }

    async as_getCodesOfUserId(user_id){
        return (await this.db.query('SELECT code.name, code.code, code.id FROM code WHERE id_user = $1', [user_id])).rows;
    }

    async as_deleteCodeByUUID(uuid){
        await this.db.query('DELETE FROM code WHERE id = $1', [uuid]);
    }

    async _asGetCodeByUUID(uuid){
        return (await this.db.query('SELECT code.code, code.name FROM code WHERE id = $1', [$uuid])).rows[0];
    }

    async close(){
        this.db.end();
    }
}

module.exports = DBpg;
/*
const config = require('config');

async function exec() {
    let db = new DBpg(config.db, 'db.pgsql');
    await db.as_connect();
    await db.as_init();
}

exec();
*/
