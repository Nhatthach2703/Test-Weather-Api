const express = require('express');
const router = express.Router();
const openweathermapController = require('../controllers/openweathermapController');

// Route lấy thời tiết hiện tại
router.get('/current', openweathermapController.getCurrentWeather);

// Route lấy dự báo thời tiết theo ngày
router.get('/forecast', openweathermapController.getForecastWeather);

module.exports = router;
