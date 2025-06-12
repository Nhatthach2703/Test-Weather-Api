var express = require('express');
var router = express.Router();

/* GET home page - API Information */
router.get('/', function(req, res, next) {
  res.json({
    name: 'Weather API',
    version: '1.0.0',
    description: 'A comprehensive Weather API that aggregates data from multiple providers (WeatherAPI.com, OpenWeatherMap, Tomorrow.io) for Vietnamese cities and provinces',
    providers: [
      'WeatherAPI.com',
      'OpenWeatherMap', 
      'Tomorrow.io'
    ],
    endpoints: {
      weatherapi: [
        '/weatherapi/current?city={cityName}',
        '/weatherapi/forecast?city={cityName}&days={number}'
      ],
      openweathermap: [
        '/openweathermap/current?city={cityName}',
        '/openweathermap/forecast?city={cityName}&days={number}'
      ],
      tomorrow: [
        '/tomorrow/current?city={cityName}',
        '/tomorrow/forecast?city={cityName}&days={number}'
      ]
    },
    documentation: '/api-docs',
    supportedCities: 'Vietnamese cities and provinces',
    examples: {
      getCurrentWeather: '/weatherapi/current?city=Ho Chi Minh City',
      getForecast: '/weatherapi/forecast?city=Hanoi&days=5'
    }
  });
});

module.exports = router;
