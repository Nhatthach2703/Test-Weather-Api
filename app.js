var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { swaggerUi, specs } = require('./config/swagger');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const openweathermapRouter = require('./routes/openweathermap');
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
app.use('/openweathermap', openweathermapRouter);
app.use('/weatherapi', weatherapiRouter); // best API theo Thạch test =)))))
app.use('/tomorrow', tomorrowRouter);

// Swagger API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "Weather API Documentation"
}));

module.exports = app;
