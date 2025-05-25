const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = process.env.TOMORROW_API_KEY;

// Lấy tọa độ từ thành phố (sử dụng tạm định nghĩa cứng một số TP Việt Nam)
const cityToCoords = {
  Hanoi: { lat: 21.0285, lon: 105.8542 },
  'Ho Chi Minh': { lat: 10.762622, lon: 106.660172 },
  Danang: { lat: 16.047079, lon: 108.20623 },
};

function getCoords(city) {
  return cityToCoords[city] || null;
}

// Thời tiết hiện tại
router.get('/current', async (req, res) => {
  const { city } = req.query;
  const coords = getCoords(city);
  if (!coords) return res.status(400).json({ error: 'City not supported' });

  try {
    const url = `https://api.tomorrow.io/v4/weather/realtime`;
    const response = await axios.get(url, {
      params: {
        location: `${coords.lat},${coords.lon}`,
        apikey: API_KEY,
      },
    });

    const data = response.data.data;
    res.json({
      city,
      temperature: data.values.temperature,
      humidity: data.values.humidity,
      windSpeed: data.values.windSpeed, // m/s
      weatherCode: data.values.weatherCode,
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch current weather' });
  }
});

// Dự báo theo ngày
router.get('/forecast', async (req, res) => {
  const { city, days = 3 } = req.query;

  // Bảng tọa độ các thành phố Việt Nam (có thể thêm/bớt)
  const cityToCoords = {
    Hanoi: { lat: 21.0285, lon: 105.8542 },
    "Ho Chi Minh": { lat: 10.762622, lon: 106.660172 },
    Danang: { lat: 16.047079, lon: 108.20623 },
  };

  const coords = cityToCoords[city];
  if (!coords) return res.status(400).json({ error: 'City not supported' });

  try {
    // Tomorrow.io Forecast API endpoint
    const url = 'https://api.tomorrow.io/v4/timelines';

    // Tham số gửi theo docs:
    // fields: dữ liệu cần lấy (nhiệt độ max/min/avg, độ ẩm, gió,...)
    // timesteps: 1d = mỗi ngày
    // startTime: hiện tại
    // units: metric (để ra độ C, km/h,...)
    const params = {
      apikey: API_KEY,
      location: `${coords.lat},${coords.lon}`,
      fields: [
        'temperatureMax',
        'temperatureMin',
        'temperatureAvg',
        'humidityAvg',
        'windSpeedMax',
        'weatherCode',
      ],
      timesteps: '1d',
      units: 'metric',
      startTime: new Date().toISOString(),
      // Có thể thêm endTime dựa trên days
    };

    const response = await axios.get(url, { params });

    // Dữ liệu timeline nằm trong response.data.data.timelines[0].intervals
    const intervals = response.data.data.timelines[0].intervals;

    // Lấy số ngày theo yêu cầu
    const forecastDays = intervals.slice(0, Number(days)).map(day => ({
      date: day.startTime.split('T')[0],
      temperatureMaxC: day.values.temperatureMax,
      temperatureMinC: day.values.temperatureMin,
      temperatureAvgC: day.values.temperatureAvg,
      humidityAvg: day.values.humidityAvg,
      windSpeedMaxKph: day.values.windSpeedMax,
      weatherCode: day.values.weatherCode,
    }));

    res.json({
      city,
      forecast: forecastDays,
    });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch forecast' });
  }
});

module.exports = router;
