const request = require('supertest');
const app = require('../../app');

describe('Tomorrow.io Controller Tests', () => {
  describe('GET /tomorrow/current', () => {
    test('should return weather data for supported Vietnamese city', async () => {
      const response = await request(app)
        .get('/tomorrow/current?city=Hanoi')
        .expect(200);

      expect(response.body).toHaveProperty('city');
      expect(response.body).toHaveProperty('temperature');
      expect(response.body).toHaveProperty('temperatureApparent');
      expect(response.body).toHaveProperty('humidity');
      expect(response.body).toHaveProperty('windSpeed');
    });

    test('should return coordinates for valid Vietnamese city', async () => {
      const tomorrowController = require('../../controllers/tomorrowController');
      const coords = tomorrowController.getCoords('Hanoi');
      
      expect(coords).toHaveProperty('lat');
      expect(coords).toHaveProperty('lon');
      expect(typeof coords.lat).toBe('number');
      expect(typeof coords.lon).toBe('number');
    });

    test('should handle unsupported city', async () => {
      const tomorrowController = require('../../controllers/tomorrowController');
      const coords = tomorrowController.getCoords('UnknownCity');
      
      expect(coords).toBeNull();
    });
  });

  describe('GET /tomorrow/forecast', () => {
    test('should return forecast data with proper structure', async () => {
      const response = await request(app)
        .get('/tomorrow/forecast?city=HoChiMinh&days=3')
        .expect(200);

      expect(response.body).toHaveProperty('city');
      expect(response.body).toHaveProperty('forecast');
      expect(Array.isArray(response.body.forecast)).toBe(true);
      
      if (response.body.forecast.length > 0) {
        const forecast = response.body.forecast[0];
        expect(forecast).toHaveProperty('date');
        expect(forecast).toHaveProperty('temperature');
        expect(forecast).toHaveProperty('humidity');
      }
    });
  });

  describe('City Coordinates Mapping', () => {
    test('should have coordinates for all major Vietnamese cities', () => {
      const tomorrowController = require('../../controllers/tomorrowController');
      const majorCities = ['Hanoi', 'HoChiMinh', 'Danang', 'Haiphong', 'CanTho'];
      
      majorCities.forEach(city => {
        const coords = tomorrowController.getCoords(city);
        expect(coords).not.toBeNull();
        expect(coords.lat).toBeGreaterThan(8); // Vietnam's southernmost point
        expect(coords.lat).toBeLessThan(24); // Vietnam's northernmost point
        expect(coords.lon).toBeGreaterThan(102); // Vietnam's westernmost point
        expect(coords.lon).toBeLessThan(110); // Vietnam's easternmost point
      });
    });
  });
});
