const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = process.env.WEATHER_API_KEY;

// Thời tiết hiện tại
router.get('/current', async (req, res) => {
    const city = req.query.city;
    if (!city) return res.status(400).json({ error: 'City is required' });

    try {
        const response = await axios.get('http://api.weatherapi.com/v1/current.json', {
            params: {
                key: API_KEY,
                q: city,
                lang: 'vi'
            },
        });

        const data = response.data;
        res.json({
            city: data.location.name,
            country: data.location.country,
            temp_c: data.current.temp_c,
            feelslike_c: data.current.feelslike_c, // Nhiệt độ cảm nhận được
            condition: data.current.condition, // condition: data.current.condition.text,
            icon: data.current.condition.icon,
            wind_kph: data.current.wind_kph, // km/h
            wind_degree: data.current.wind_degree, // Độ gió
            wind_dir: data.current.wind_dir, // Hướng gió
            humidity: data.current.humidity, // Độ ẩm
            pressure_mb: data.current.pressure_mb, // Áp suất khí quyển (milibar)
            precip_mm: data.current.precip_mm, // Lượng mưa (mm)
            cloud: data.current.cloud, // Độ che phủ mây (%)
            uv: data.current.uv, // Chỉ số UV
            vis_km: data.current.vis_km, // Tầm nhìn (km)
            gust_kph: data.current.gust_kph, // Gió giật (km/h)
        });
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ error: 'Failed to fetch weather' });
    }
});

// Dự báo thời tiết theo ngày
router.get('/forecast', async (req, res) => {
    const city = req.query.city;
    const days = req.query.days || 3;

    if (!city) return res.status(400).json({ error: 'City is required' });

    try {
        const response = await axios.get('http://api.weatherapi.com/v1/forecast.json', {
            params: {
                key: API_KEY,
                q: city,
                days,
                lang: 'vi' // Ngôn ngữ tiếng Việt
            },
        });

        const forecastDays = response.data.forecast.forecastday.map(day => ({
            date: day.date,
            condition: day.day.condition, // condition: day.day.condition.text,
            icon: day.day.condition.icon,
            avg_temp_c: day.day.avgtemp_c,
            max_temp_c: day.day.maxtemp_c,
            min_temp_c: day.day.mintemp_c,
        }));

        res.json({
            city: response.data.location.name,
            forecast: forecastDays
        });
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ error: 'Failed to fetch forecast' });
    }
});

module.exports = router;
