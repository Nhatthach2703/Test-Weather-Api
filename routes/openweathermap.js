const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

// Route: Thời tiết hiện tại
router.get('/current', async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: 'City is required' });

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: `${city},VN`,
        appid: API_KEY,
        units: 'metric',
        lang: 'vi',
      },
    });

    const data = response.data;
    res.json({
      city: data.name,
      temperature: data.main.temp,
      weather: data.weather[0].description,
      humidity: data.main.humidity,
      wind_speed: data.wind.speed, // m/s
    });
  } catch (error) {
    console.error("OpenWeather Error:", error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch current weather' });
  }
});

// Route: Dự báo theo ngày
router.get('/forecast', async (req, res) => {
  const city = req.query.city;
  const days = parseInt(req.query.days) || 1;

  if (!city) return res.status(400).json({ error: 'City is required' });
  if (days < 1 || days > 5) return res.status(400).json({ error: 'Days must be between 1 and 5' });

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
      params: {
        q: `${city},VN`,
        appid: API_KEY,
        units: 'metric',
        lang: 'vi',
      },
    });

    const forecastData = response.data.list;

    const groupedByDay = {};
    for (let item of forecastData) {
      const date = item.dt_txt.split(' ')[0];
      if (!groupedByDay[date]) groupedByDay[date] = [];
      groupedByDay[date].push(item);
    }

    const result = [];
    const dates = Object.keys(groupedByDay).slice(0, days);
    for (let date of dates) {
      const dayData = groupedByDay[date];
      const selected = dayData.find(i => i.dt_txt.includes('12:00:00')) || dayData[0];
      result.push({
        date,
        temperature: selected.main.temp,
        weather: selected.weather[0].description,
      });
    }

    res.json({
      city: response.data.city.name,
      forecast: result,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch forecast' });
  }
});

module.exports = router;
