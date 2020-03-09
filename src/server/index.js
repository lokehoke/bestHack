const env = process.env.NODE_ENV || "development";

const config = require('config');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const serverConfig = { port: 3000 };

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(Math.random().toString(36).substr(2, 5))); //Now cookie parser become a middleware
//app.use(express.static('../../public'));
//Enable AJAX support
app.use(cors());

//Main route
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
app.use('/', indexRouter);
app.use('/auth', authRouter);

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
