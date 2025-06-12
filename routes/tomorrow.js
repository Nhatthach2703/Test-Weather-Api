const express = require('express');
const router = express.Router();
const tomorrowController = require('../controllers/tomorrowController');

// Route lấy thời tiết hiện tại
router.get('/current', tomorrowController.getCurrentWeather);

// Route lấy dự báo thời tiết theo ngày
router.get('/forecast', tomorrowController.getForecastWeather);

module.exports = router;
