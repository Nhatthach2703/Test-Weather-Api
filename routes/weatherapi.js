const express = require('express');
const router = express.Router();
const weatherapiController = require('../controllers/weatherapiController');

// Route lấy thời tiết hiện tại
router.get('/current', weatherapiController.getCurrentWeather);

// Route lấy dự báo thời tiết theo ngày
router.get('/forecast', weatherapiController.getForecastWeather);

module.exports = router;
