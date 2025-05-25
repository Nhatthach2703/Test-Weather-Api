# Test Weather API

A Node.js Express application that provides weather data for cities in Vietnam by integrating multiple public weather APIs. This project is designed for learning, demo, and as a template for building unified weather data services.

## Features
- **Multi-provider support:**
  - [OpenWeatherMap](https://openweathermap.org/)
  - [WeatherAPI](https://www.weatherapi.com/)
  - [Tomorrow.io](https://www.tomorrow.io/)
- **Endpoints for:**
  - Current weather
  - Weather forecast (multi-day, where supported)
- **Vietnam-focused:**
  - Query by city name (Vietnamese cities)
  - Tomorrow.io supports: Hanoi, Ho Chi Minh, Danang (can extend easily)
- **JSON API:**
  - Unified, clean JSON responses for easy frontend or integration use
- **Environment-based configuration:**
  - API keys managed via `.env` file

## Requirements
- Node.js (v14 or newer recommended)
- npm (Node package manager)

## Getting Started

### 1. Clone the repository
```sh
# Clone this project to your local machine
 git clone <your-repo-url>
 cd Test-Weather-Api
```

### 2. Install dependencies
```sh
npm install
```

### 3. Configure API keys
- Copy `.env.example` to `.env`:
  ```sh
  cp .env.example .env
  ```
- Get your API keys from the following services:
  - [OpenWeatherMap](https://openweathermap.org/appid)
  - [WeatherAPI](https://www.weatherapi.com/signup.aspx)
  - [Tomorrow.io](https://app.tomorrow.io/development/keys)
- Fill in your keys in the `.env` file:
  ```env
  OPENWEATHERMAP_API_KEY=your_openweathermap_key
  WEATHER_API_KEY=your_weatherapi_key
  TOMORROW_API_KEY=your_tomorrowio_key
  ```

### 4. Start the server
```sh
npm start
```
- The server will run at: [http://localhost:3000](http://localhost:3000)

## API Endpoints

### OpenWeatherMap
- `GET /weather/current?city=Hanoi` — Current weather for a city
- `GET /weather/forecast?city=Hanoi&days=3` — 3-day forecast for a city

### WeatherAPI
- `GET /weatherapi/current?city=Hanoi` — Current weather for a city
- `GET /weatherapi/forecast?city=Hanoi&days=3` — 3-day forecast for a city

### Tomorrow.io
- `GET /tomorrow/current?city=Hanoi` — Current weather (supported cities only)
- `GET /tomorrow/forecast?city=Hanoi&days=3` — 3-day forecast (supported cities only)

> **Note:** Supported cities for Tomorrow.io: `Hanoi`, `Ho Chi Minh`, `Danang`. You can add more in `routes/tomorrow.js`.

### Example Response (`/weatherapi/current?city=Hanoi`)
```json
{
  "city": "Hanoi",
  "country": "Vietnam",
  "temp_c": 30.5,
  "feelslike_c": 33.0,
  "condition": { "text": "Partly cloudy", "icon": "//cdn.weatherapi.com/..." },
  "wind_kph": 10.8,
  "humidity": 70,
  ...
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
- **Add more cities:** Edit `cityToCoords` in `routes/tomorrow.js` for Tomorrow.io.
- **Add more APIs:** Create a new route file in `routes/` and register it in `app.js`.
- **Frontend:** You can build a frontend to consume these endpoints easily (React, Vue, etc).

## Troubleshooting
- If you get API errors, check your API keys and quota.
- For Tomorrow.io, only a few cities are mapped by default.
- Use tools like [Postman](https://www.postman.com/) or browser to test endpoints.

## License
This project is for educational and demonstration purposes only.
