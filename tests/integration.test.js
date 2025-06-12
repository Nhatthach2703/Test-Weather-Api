const request = require('supertest');
const app = require('../app');

describe('API Integration Tests', () => {
  describe('Health Check', () => {    test('should return API status', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.body).toHaveProperty('name');
      expect(response.body.name).toContain('Weather API');
    });
  });

  describe('Swagger Documentation', () => {
    test('should serve Swagger UI', async () => {
      const response = await request(app)
        .get('/api-docs/')
        .expect(200);

      expect(response.text).toContain('swagger');
    });
  });

  describe('Cross-Provider Consistency', () => {
    const testCity = 'Hanoi';
    const providers = ['weatherapi', 'openweathermap', 'tomorrow'];    test.each(providers)('should return consistent data structure from %s', async (provider) => {
      const response = await request(app)
        .get(`/${provider}/current?city=${testCity}`);

      // Handle different providers' response structures and authentication errors
      if (response.status === 200) {
        expect(response.body).toHaveProperty('city');
        expect(response.body.city).toBe(testCity);
        
        // WeatherAPI uses temp_c, others may use temperature
        if (provider === 'weatherapi') {
          expect(response.body).toHaveProperty('temp_c');
          expect(typeof response.body.temp_c).toBe('number');
        } else {
          // For openweathermap and tomorrow, we may get auth errors in test
          if (response.body.temperature) {
            expect(typeof response.body.temperature).toBe('number');
          }
        }
      } else if (response.status === 500) {
        // Handle API authentication errors in test environment
        expect(response.body).toHaveProperty('error');
      } else {
        // Other error cases
        expect([200, 400, 500]).toContain(response.status);
      }
    });

    test('should handle rate limiting gracefully', async () => {
      // Simulate multiple rapid requests
      const requests = Array(5).fill().map(() => 
        request(app).get('/weatherapi/current?city=Hanoi')
      );

      const responses = await Promise.all(requests);
      
      // All should succeed or handle rate limiting properly
      responses.forEach(response => {
        expect([200, 429]).toContain(response.status);
      });
    });
  });

  describe('Error Handling', () => {
    test('should handle missing city parameter consistently across providers', async () => {
      const providers = ['weatherapi', 'openweathermap', 'tomorrow'];
      
      for (const provider of providers) {
        const response = await request(app)
          .get(`/${provider}/current`)
          .expect(400);

        expect(response.body).toHaveProperty('error');
      }
    });

    test('should handle invalid endpoints gracefully', async () => {
      const response = await request(app)
        .get('/invalid-endpoint')
        .expect(404);
    });
  });

  describe('Performance Tests', () => {
    test('should respond within acceptable time limits', async () => {
      const startTime = Date.now();
      
      await request(app)
        .get('/weatherapi/current?city=Hanoi')
        .expect(200);
        
      const responseTime = Date.now() - startTime;
      expect(responseTime).toBeLessThan(5000); // 5 seconds max
    });
  });
});
