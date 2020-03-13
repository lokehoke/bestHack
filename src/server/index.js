'use strict';

const env = process.env.NODE_ENV || "development";

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('config');
const serverConfig = { port: 3000 };
const exp_stat = { index: false };

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.secretKey));
app.use(express.static('public', exp_stat));
//Now cookie parser become a middleware
//app.use(express.static('../../public'));
//Enable AJAX support
app.use(cors());


//Routes classes
const promiseGetIndexRouter = require('./routes/index');
const promiseGetAuthRouter  = require('./routes/auth');
const promiseGetRegRouter = require('./routes/register');
const promiseGetMainRouter = require('./routes/main');
const promiseGetAdminRouter = require('./routes/admin');

//API
const promiseGetAlgoCodeRouter = require('./api/routes/algoCode');
const promiseGetStatusRouter = require('./api/routes/status');

async function main() {
    const index = await promiseGetIndexRouter();
    const auth = await promiseGetAuthRouter(index);
    const register = await promiseGetRegRouter(auth);
    const main_r = await promiseGetMainRouter(register);
    const admin = await promiseGetAdminRouter(main_r);

    //API
    const apiAlgoCode = await promiseGetAlgoCodeRouter(admin);
    const apiStatus = await promiseGetStatusRouter(apiAlgoCode);

    app.use('/', index.router);
    app.use('/auth', auth.router);
    app.use('/register', register.router);
    app.use('/main', main_r.router);
    app.use('/admin', admin.router);

    //API
    app.use('/algoCode', apiAlgoCode.router);
    app.use('/status', apiStatus.router);

    app.get('*', (req, res) => { res.sendStatus(404); });



    process.on('uncaughtException', async (err) => {
        //close file descriptors
        await index.middlewares.auth.db.close();
        console.error(err);
        process.exit(1);});

    process.on('SIGTERM', (err) => {
        app.close(async () => {
            await index.middlewares.auth.db.close();
            console.error(err);
        });
    });

    app.listen(serverConfig.port, () => { console.log(`The server is started on the port: ${serverConfig.port}!`)});
}

main();
