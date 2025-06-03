# Test Weather API

Test Weather API is a Node.js Express application that provides unified weather data for cities in Vietnam by integrating multiple public weather APIs. This project is ideal for learning, demonstrations, or as a template for building weather data services.

## Features
- **Multi-provider support:**
  - [OpenWeatherMap](https://openweathermap.org/): Global weather data provider.
  - [WeatherAPI](https://www.weatherapi.com/): Comprehensive weather data and forecasts.
  - [Tomorrow.io](https://www.tomorrow.io/): Advanced weather intelligence, currently mapped for major Vietnamese cities.
- **Endpoints:**
  - Get current weather for a city.
  - Get multi-day weather forecasts (where supported by the API).
- **Vietnam-focused:**
  - Query by Vietnamese city names (e.g., Hanoi, Ho Chi Minh, Danang).
  - Tomorrow.io supports: Hanoi, Ho Chi Minh, Danang by default (easily extendable).
- **Unified JSON API:**
  - Returns consistent, clean JSON data regardless of the provider, making it easy for frontend consumption or integration with other services.
- **Environment-based configuration:**
  - API keys and sensitive configuration are managed via a `.env` file for security and flexibility.

## Requirements
- Node.js (version 14 or newer recommended)
- npm (Node package manager)

## Getting Started

### 1. Clone the repository
Clone the project to your local machine:
```sh
git clone <your-repo-url>
cd Test-Weather-Api
```

### 2. Install dependencies
Install all required Node.js packages:
```sh
npm install
```

### 3. Configure API keys
- Copy the example environment file to create your own configuration:
  ```sh
  cp .env.example .env
  ```
- Register and obtain API keys from the following services:
  - [OpenWeatherMap](https://openweathermap.org/appid)
  - [WeatherAPI](https://www.weatherapi.com/signup.aspx)
  - [Tomorrow.io](https://app.tomorrow.io/development/keys)
- Fill in your API keys in the `.env` file:
  ```env
  OPENWEATHERMAP_API_KEY=your_openweathermap_key
  WEATHER_API_KEY=your_weatherapi_key
  TOMORROW_API_KEY=your_tomorrowio_key
  ```

### 4. Start the server
Start the Express server:
```sh
npm start
```
The server will run at: [http://localhost:3000](http://localhost:3000)

## API Endpoints

### OpenWeatherMap
- `GET /weather/current?city=Hanoi` — Get current weather for a city (e.g., Hanoi).
- `GET /weather/forecast?city=Hanoi&days=3` — Get a 3-day weather forecast for a city.

### WeatherAPI
- `GET /weatherapi/current?city=Hanoi` — Get current weather for a city.
- `GET /weatherapi/forecast?city=Hanoi&days=3` — Get a 3-day weather forecast for a city.

### Tomorrow.io
- `GET /tomorrow/current?city=Hanoi` — Get current weather (only for supported cities).
- `GET /tomorrow/forecast?city=Hanoi&days=3` — Get a 3-day forecast (only for supported cities).

> **Note:** Default supported cities for Tomorrow.io: `Hanoi`, `Ho Chi Minh`, `Danang`. To add more, edit the `cityToCoords` variable in [`routes/tomorrow.js`](routes/tomorrow.js).

### Example Response (`/weatherapi/current?city=Hanoi`)
```json
{
  "city": "Hanoi",
  "country": "Vietnam",
  "temp_c": 30.5,
  "feelslike_c": 33.0,
  "condition": { "text": "Partly cloudy", "icon": "//cdn.weatherapi.com/..." },
  "wind_kph": 10.8,
  "humidity": 70
}
```

## Project Structure
```
Test-Weather-Api/
├── app.js                # Main Express app
├── bin/www               # Server entry point
├── routes/
│   ├── index.js          # Home route
│   ├── openweathermap.js # OpenWeatherMap API routes
│   ├── weatherapi.js     # WeatherAPI routes
│   └── tomorrow.js       # Tomorrow.io routes
├── public/               # Static files (HTML, CSS)
├── .env.example          # Example environment variables
├── package.json          # Project metadata & dependencies
└── README.md             # Project documentation
```

## Customization & Extension
- **Add more cities:** Edit the `cityToCoords` object in [`routes/tomorrow.js`](routes/tomorrow.js) to support more cities for Tomorrow.io.
- **Add new APIs:** Create a new route file in the `routes/` directory and register it in [`app.js`](app.js).
- **Frontend integration:** You can build a frontend (React, Vue, etc.) or use tools like Postman to consume and test these endpoints easily.

## Troubleshooting
- If you get API errors, check that your API keys are correct and that you have not exceeded your quota.
- Tomorrow.io only supports a few cities by default; add more as needed.
- Use [Postman](https://www.postman.com/) or your browser to test endpoints quickly.
- Ensure your `.env` file is properly configured and not committed to version control.

