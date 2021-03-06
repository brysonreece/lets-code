var dotenv = require('dotenv')
var express = require('express');
var expressHandlebars = require('express-handlebars');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

dotenv.config();

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'app',
    helpers: {
        env: function (a, b) { return process.env[a] || b; }
    }
}));

app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
