const axios = require('axios');

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

/**
 * Controller lấy thời tiết hiện tại từ OpenWeatherMap
 * @param {object} req - Request object
 * @param {object} res - Response object
 */
const getCurrentWeather = async (req, res) => {
  try {
    const city = req.query.city;
    
    if (!city) {
      return res.status(400).json({ error: 'City is required' });
    }

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
      // Trả về dữ liệu thời tiết hiện tại, những thông tin bị comment lại là bị null
      city: data.name,
      coord: data.coord, // tọa độ
      country: data.sys.country, // quốc gia
      temperature: data.main.temp, // độ C
      feels_like: data.main.feels_like, // cảm giác như
      temp_min: data.main.temp_min, // nhiệt độ thấp nhất
      temp_max: data.main.temp_max, // nhiệt độ cao nhất
      pressure: data.main.pressure, // áp suất (hPa)
      humidity: data.main.humidity, // độ ẩm (%)
      visibility: data.visibility, // tầm nhìn (m)
      wind_speed: (data.wind.speed * 3.6).toFixed(2), // km/h
      wind_deg: data.wind.deg, // hướng gió (độ)
      wind_gust: data.wind.gust, // giật gió (nếu có)
      clouds: data.clouds.all, // % mây
      weather: data.weather[0].description, // mô tả thời tiết
      weather_main: data.weather[0].main, // loại thời tiết
      sunrise: data.sys.sunrise, // unix timestamp
      sunset: data.sys.sunset, // unix timestamp
      timezone: data.timezone, // múi giờ (giây)
      dt: data.dt, // thời điểm đo (unix timestamp)
      base: data.base, // nội bộ API
      id: data.id, // id thành phố
    });
  } catch (error) {
    console.error("OpenWeather Error:", error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch current weather' });
  }
};

/**
 * Controller lấy dự báo thời tiết theo ngày từ OpenWeatherMap
 * @param {object} req - Request object
 * @param {object} res - Response object
 */
const getForecastWeather = async (req, res) => {
  try {
    const city = req.query.city;
    const days = parseInt(req.query.days) || 1;

    if (!city) {
      return res.status(400).json({ error: 'City is required' });
    }
    
    if (days < 1 || days > 5) {
      return res.status(400).json({ error: 'Days must be between 1 and 5' });
    }

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
    console.error("OpenWeather Forecast Error:", error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch forecast' });
  }
};

module.exports = {
  getCurrentWeather,
  getForecastWeather
};
