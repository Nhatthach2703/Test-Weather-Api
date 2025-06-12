// Test setup file
process.env.NODE_ENV = 'test';

// Mock environment variables for testing
process.env.OPENWEATHERMAP_API_KEY = 'test-key';
process.env.WEATHERAPI_KEY = 'test-key';
process.env.TOMORROW_API_KEY = 'test-key';

// Increase test timeout for API calls
jest.setTimeout(15000);

// Global test utilities
global.delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Console log suppression for cleaner test output
const originalConsoleError = console.error;
console.error = (...args) => {
  // Only show errors that aren't expected test errors
  if (!args[0]?.toString().includes('test')) {
    originalConsoleError(...args);
  }
};

// Cleanup after all tests
afterAll(async () => {
  // Clean up any remaining connections, timers, etc.
  await new Promise(resolve => setTimeout(resolve, 100));
});
