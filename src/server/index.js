process.env.NODE_ENV = "development";

const express = require('express');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('../../public'));

app.use('/', indexRouter);

app.listen(80, () => console.log('The server is started!'));