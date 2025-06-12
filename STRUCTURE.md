# 🏗️ Weather API - Project Architecture Documentation

## 📋 Table of Contents
1. [Overview](#overview)
2. [Architecture Pattern](#architecture-pattern)
3. [Project Structure](#project-structure)
4. [Controller Layer](#controller-layer)
5. [Routing Layer](#routing-layer)
6. [Data Flow](#data-flow)
7. [API Endpoints](#api-endpoints)
8. [Configuration](#configuration)
9. [Best Practices](#best-practices)

## 🌟 Overview

The **Weather API Project** is a Node.js Express application built using the **Model-View-Controller (MVC)** architectural pattern. This RESTful API aggregates weather data from multiple providers (OpenWeatherMap, WeatherAPI.com, Tomorrow.io) and serves it through a unified interface for Vietnamese cities and provinces.

### Key Design Principles
- **Separation of Concerns**: Business logic isolated from routing logic
- **Single Responsibility**: Each component has one clear purpose
- **DRY (Don't Repeat Yourself)**: Reusable components and utilities
- **Scalability**: Easy to extend with new weather providers
- **Maintainability**: Clean, organized codebase structure

## 🎯 Architecture Pattern

### MVC Implementation

```mermaid
graph TD
    A[Client Request] --> B[Router Layer]
    B --> C[Controller Layer]
    C --> D[External Weather APIs]
    D --> C
    C --> E[JSON Response]
    E --> A
```

#### **Model Layer** (Implicit)
- External API data models (OpenWeatherMap, WeatherAPI, Tomorrow.io)
- Data transformation and normalization
- City coordinate mapping

#### **View Layer**
- JSON API responses
- Consistent data formatting across providers
- Error response standardization

#### **Controller Layer**
- Business logic implementation
- API integration and data processing
- Error handling and validation

## 📁 Project Structure

### Directory Tree
```
Test-Weather-Api/
├── 📂 controllers/              # 🎯 Business Logic Layer
│   ├── 🔧 tomorrowController.js      # Tomorrow.io API integration
│   ├── 🔧 openweathermapController.js # OpenWeatherMap API integration
│   └── 🔧 weatherapiController.js    # WeatherAPI.com integration
├── 📂 routes/                   # 🛣️ HTTP Routing Layer
│   ├── 🏠 index.js                  # Home page routes
│   ├── 👥 users.js                  # User management routes
│   ├── 🌤️ tomorrow.js               # Tomorrow.io endpoints
│   ├── 🌤️ openweathermap.js         # OpenWeatherMap endpoints
│   └── 🌤️ weatherapi.js             # WeatherAPI endpoints
├── 📂 public/                   # 🎨 Static Assets
│   ├── 📂 stylesheets/             # CSS files
│   ├── 📂 images/                  # Image assets
│   └── 📂 javascripts/             # Client-side JS
├── 📂 bin/                      # ⚙️ Server Configuration
│   └── 🚀 www                       # Server startup script
├── 📂 node_modules/             # 📦 Dependencies (auto-generated)
├── 🔧 app.js                    # 🏗️ Express application setup
├── 📋 package.json              # 📦 Project metadata & dependencies
├── 📋 package-lock.json         # 🔒 Dependency lock file
├── 🔐 .env                      # 🔑 Environment variables (local)
├── 📋 .env.example              # 📋 Environment template
├── 📖 README.md                 # 📚 Project documentation
├── 🏗️ STRUCTURE.md              # 📊 Architecture documentation
├── 📝 REFACTORING_SUMMARY.md    # 📝 Refactoring log
└── 🚫 .gitignore                # 🚫 Git ignore rules
```

### File Responsibilities

#### 🎯 **Controllers** (`/controllers/`)
| File | Responsibility | Key Methods |
|------|----------------|-------------|
| `tomorrowController.js` | Tomorrow.io API integration | `getCurrentWeather()`, `getForecastWeather()`, `getCoords()` |
| `openweathermapController.js` | OpenWeatherMap API integration | `getCurrentWeather()`, `getForecastWeather()` |
| `weatherapiController.js` | WeatherAPI.com integration | `getCurrentWeather()`, `getForecastWeather()` |

#### 🛣️ **Routes** (`/routes/`)
| File | Purpose | Endpoints |
|------|---------|-----------|
| `tomorrow.js` | Tomorrow.io routing | `/current`, `/forecast` |
| `openweathermap.js` | OpenWeatherMap routing | `/current`, `/forecast` |
| `weatherapi.js` | WeatherAPI routing | `/current`, `/forecast` |
| `index.js` | Home page routing | `/` |
| `users.js` | User management routing | `/users` |

#### ⚙️ **Configuration Files**
| File | Purpose | Description |
|------|---------|-------------|
| `app.js` | Express setup | Application configuration, middleware, route registration |
| `package.json` | Project metadata | Dependencies, scripts, project information |
| `.env` | Environment variables | API keys, configuration settings |
| `bin/www` | Server startup | HTTP server initialization and port binding |

## 🎯 Controller Layer

### Architecture Overview
Controllers implement the business logic layer, handling:
- **API Integration**: Direct communication with external weather services
- **Data Transformation**: Converting provider-specific responses to unified format
- **Error Handling**: Managing API failures, network issues, and validation errors
- **Input Validation**: Ensuring request parameters are valid and safe

### Detailed Controller Analysis

#### 🌤️ **Tomorrow.io Controller** (`tomorrowController.js`)

```javascript
// Core functionality
├── getCurrentWeather(req, res)     # Real-time weather data
├── getForecastWeather(req, res)    # Multi-day weather forecast
├── getCoords(city)                 # City-to-coordinates utility
└── cityToCoords                    # 63 Vietnamese cities mapping
```

**Key Features:**
- **Comprehensive City Coverage**: 63 Vietnamese provinces and cities
- **Coordinate Mapping**: Precise latitude/longitude for each location
- **Hyperlocal Forecasting**: Advanced weather intelligence
- **Error Resilience**: Robust error handling for API failures

**Data Processing:**
```javascript
// Input: city name (string)
// Output: standardized weather object
{
  city: "Hanoi",
  temperature: 28.5,
  temperatureApparent: 31.2,
  humidity: 65,
  windSpeed: 12.6,
  // ... additional fields
}
```

#### 🌍 **OpenWeatherMap Controller** (`openweathermapController.js`)

```javascript
// Core functionality
├── getCurrentWeather(req, res)     # Current weather conditions
└── getForecastWeather(req, res)    # 5-day weather forecast
```

**Key Features:**
- **Global Coverage**: Worldwide weather data
- **Detailed Metrics**: Comprehensive weather parameters
- **Multi-language Support**: Vietnamese language support
- **Historical Data**: Access to historical weather information

#### ⚡ **WeatherAPI Controller** (`weatherapiController.js`)

```javascript
// Core functionality
├── getCurrentWeather(req, res)     # Real-time weather data
└── getForecastWeather(req, res)    # Extended weather forecast
```

**Key Features:**
- **High Accuracy**: Precise weather predictions
- **Rich Data**: Detailed weather condition information
- **Fast Response**: Optimized for speed and reliability
- **Extensive Coverage**: Global weather data with local accuracy

### Controller Method Signatures

```javascript
// Standard controller method signature
const methodName = async (req, res) => {
  try {
    // 1. Extract and validate parameters
    const { city, days } = req.query;
    
    // 2. Validate input
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }
    
    // 3. Process business logic
    const weatherData = await fetchWeatherData(city);
    
    // 4. Transform and return response
    res.json(transformedData);
  } catch (error) {
    // 5. Handle errors gracefully
    console.error('Controller Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
```

## 🛣️ Routing Layer

### Route Structure
Each route file follows a consistent pattern:

```javascript
// Standard route file structure
const express = require('express');
const router = express.Router();
const controllerName = require('../controllers/controllerFile');

// Route definitions
router.get('/current', controllerName.getCurrentWeather);
router.get('/forecast', controllerName.getForecastWeather);

module.exports = router;
```

### Route Registration (`app.js`)
```javascript
// Route mounting in Express application
app.use('/weatherapi', weatherapiRouter);
app.use('/openweathermap', openweathermapRouter);
app.use('/tomorrow', tomorrowRouter);
```

### URL Structure
```
http://localhost:3000/{provider}/{endpoint}?{parameters}

Examples:
├── /weatherapi/current?city=Hanoi
├── /openweathermap/forecast?city=Danang&days=5
└── /tomorrow/current?city=Ho%20Chi%20Minh
```

## 🔄 Data Flow

### Request-Response Cycle

```mermaid
sequenceDiagram
    participant Client
    participant Router
    participant Controller
    participant External API
    participant Response

    Client->>Router: HTTP Request (/weatherapi/current?city=Hanoi)
    Router->>Controller: Route to weatherapiController.getCurrentWeather()
    Controller->>Controller: Validate parameters
    Controller->>External API: Fetch weather data
    External API->>Controller: Raw weather data
    Controller->>Controller: Transform data
    Controller->>Response: Formatted JSON
    Response->>Client: Standardized weather response
```

### Data Transformation Pipeline

1. **Input Validation**
   ```javascript
   // Validate required parameters
   if (!city) return res.status(400).json({ error: 'City required' });
   ```

2. **API Request**
   ```javascript
   // Make external API call
   const response = await axios.get(apiUrl, { params });
   ```

3. **Data Transformation**
   ```javascript
   // Transform to standard format
   const standardData = {
     city: response.data.location.name,
     temperature: response.data.current.temp_c,
     // ... other fields
   };
   ```

4. **Response Formatting**
   ```javascript
   // Return consistent JSON structure
   res.json(standardData);
   ```

## 📡 API Endpoints

### Endpoint Documentation

#### **Current Weather**
```http
GET /{provider}/current?city={cityName}
```

**Providers:** `weatherapi`, `openweathermap`, `tomorrow`

**Parameters:**
- `city` (required): Vietnamese city or province name

**Response Format:**
```json
{
  "city": "string",
  "temperature": "number",
  "humidity": "number",
  "windSpeed": "number",
  "condition": "object",
  // ... provider-specific fields
}
```

#### **Weather Forecast**
```http
GET /{provider}/forecast?city={cityName}&days={numberOfDays}
```

**Parameters:**
- `city` (required): Vietnamese city or province name
- `days` (optional): Number of forecast days (1-5, default: 3)

**Response Format:**
```json
{
  "city": "string",
  "forecast": [
    {
      "date": "YYYY-MM-DD",
      "temperature": "number",
      "condition": "object",
      // ... daily forecast data
    }
  ]
}
```

### Supported Cities

The API supports **63 Vietnamese provinces and major cities**:

**Northern Vietnam:**
- Hanoi, Haiphong, BacNinh, BacGiang, BacKan, CaoBang, HaGiang, LangSon, LaoCai, PhuTho, QuangNinh, ThaiNguyen, TuyenQuang, VinhPhuc, YenBai, HoaBinh, HaNam, NamDinh, NinhBinh, ThanhHoa, SonLa, DienBien, LaiChau

**Central Vietnam:**
- Hue (ThuaThienHue), Danang, QuangNam, QuangNgai, BinhDinh, PhuYen, KhanhHoa (Nhatrang), NinhThuan, BinhThuan, QuangBinh, QuangTri, HaTinh, NgheAn, Vinh

**Southern Vietnam:**
- Ho Chi Minh, BinhDuong, DongNai, TayNinh, BinhPhuoc, LongAn, TienGiang, BenTre, VinhLong, TraVinh, CanTho, DongThap, AnGiang, KienGiang, HauGiang, SocTrang, BacLieu, CaMau

**Central Highlands:**
- DakLak (BuonMaThuot), DakNong, GiaLai (Pleiku), KonTum, LamDong (Dalat)

## ⚙️ Configuration

### Environment Variables
```env
# API Keys (required)
OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
WEATHER_API_KEY=your_weatherapi_key
TOMORROW_API_KEY=your_tomorrow_api_key

# Server Configuration (optional)
NODE_ENV=development
PORT=3000
```

### Application Configuration (`app.js`)
```javascript
// Essential middleware
app.use(logger('dev'));              # Request logging
app.use(express.json());             # JSON parsing
app.use(express.urlencoded());       # URL encoding
app.use(cookieParser());             # Cookie handling
app.use(express.static());           # Static file serving

// Route registration
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/openweathermap', openweathermapRouter);
app.use('/weatherapi', weatherapiRouter);
app.use('/tomorrow', tomorrowRouter);
```

## 🎯 Best Practices

### 1. **Error Handling**
```javascript
// Consistent error response format
try {
  // Business logic
} catch (error) {
  console.error('Operation failed:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: error.message 
  });
}
```

### 2. **Input Validation**
```javascript
// Parameter validation
const { city, days = 3 } = req.query;
if (!city) {
  return res.status(400).json({ error: 'City parameter is required' });
}
if (days < 1 || days > 5) {
  return res.status(400).json({ error: 'Days must be between 1 and 5' });
}
```

### 3. **Response Consistency**
```javascript
// Standardized response structure
res.json({
  city: cityName,
  timestamp: new Date().toISOString(),
  data: transformedData,
  source: 'weatherapi'
});
```

### 4. **Code Organization**
- **Single Responsibility**: Each function has one clear purpose
- **DRY Principle**: Reusable utility functions
- **Modular Design**: Separate concerns into different files
- **Consistent Naming**: Clear, descriptive variable and function names

### 5. **Security Practices**
- **Environment Variables**: Sensitive data in `.env` files
- **Input Sanitization**: Validate all user inputs
- **Error Information**: Don't expose internal system details
- **HTTPS**: Use secure connections in production

---

## 🔗 Related Documentation

- **[README.md](README.md)**: Complete project documentation and setup guide
- **[REFACTORING_SUMMARY.md](REFACTORING_SUMMARY.md)**: Detailed refactoring process documentation
- **[API Documentation](README.md#-api-reference)**: Complete API endpoint reference

---

**📝 Last Updated:** June 12, 2025  
**👨‍💻 Architecture Version:** MVC v2.0  
**🔄 Status:** Production Ready
