const env = process.env.NODE_ENV || "development";

const config = require('config');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const serverConfig = { port: 3000 };
const exp_stat = { index: false };

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(Math.random().toString(36).substr(2, 5)));
app.use(express.static('public', exp_stat));
//Now cookie parser become a middleware
//app.use(express.static('../../public'));
//Enable AJAX support
app.use(cors());

//Routes classes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

const auth = AuthInitialize(config.db);

app.use('/', indexRouter(auth));
app.use('/auth', authRouter(auth));

process.on('uncaughtException', (err) => {
    //close file descriptors
    //close db connections and so on
    console.error(err);
    process.exit(1);});

process.on('SIGTERM', (err) => {
    app.close(() => {
        console.error(err);
    });
});

app.listen(serverConfig.port, () => { console.log(`The server is started on the port: ${serverConfig.port}!`)});
