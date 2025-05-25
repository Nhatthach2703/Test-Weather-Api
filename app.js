var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const weatherRouter = require('./routes/openweathermap');
var weatherapiRouter = require('./routes/weatherapi');
const tomorrowRouter = require('./routes/tomorrow');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/weather', weatherRouter);
app.use('/weatherapi', weatherapiRouter); // best API theo Thạch test =)))))
app.use('/tomorrow', tomorrowRouter);

module.exports = app;
