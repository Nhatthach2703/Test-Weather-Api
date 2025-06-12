const axios = require('axios');

const API_KEY = process.env.WEATHER_API_KEY;

/**
 * Controller lấy thời tiết hiện tại từ WeatherAPI
 * @param {object} req - Request object
 * @param {object} res - Response object
 */
const getCurrentWeather = async (req, res) => {
    try {
        const city = req.query.city;
        
        if (!city) {
            return res.status(400).json({ error: 'City is required' });
        }

        const response = await axios.get('http://api.weatherapi.com/v1/current.json', {
            params: {
                key: API_KEY,
                q: city,
                lang: 'vi'
            },
        });

        const data = response.data;
        
        res.json({
            // Trả về dữ liệu thời tiết hiện tại, những thông tin bị comment lại là bị null
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
        console.error('WeatherAPI Current Error:', err.response?.data || err.message);
        res.status(500).json({ error: 'Failed to fetch weather' });
    }
};

/**
 * Controller lấy dự báo thời tiết theo ngày từ WeatherAPI
 * @param {object} req - Request object
 * @param {object} res - Response object
 */
const getForecastWeather = async (req, res) => {
    try {
        const city = req.query.city;
        const days = req.query.days || 3;

        if (!city) {
            return res.status(400).json({ error: 'City is required' });
        }

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
        console.error('WeatherAPI Forecast Error:', err.response?.data || err.message);
        res.status(500).json({ error: 'Failed to fetch forecast' });
    }
};

module.exports = {
    getCurrentWeather,
    getForecastWeather
};
