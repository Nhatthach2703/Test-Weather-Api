# Weather API - Swagger Documentation

## 🎯 Overview
Weather API has been integrated with Swagger UI to provide interactive documentation and testing interface for all endpoints.

**✨ SPECIAL FEATURE**: API documentation is written entirely in a **separate YAML file** (`swagger.yaml`) instead of JSDoc comments in the code, making it easier to manage and maintain.

## 📋 Added Features

### ✅ Swagger UI Interface
- **URL**: http://localhost:3000/api-docs
- Beautiful, easy-to-use interface for API testing
- Detailed documentation for each endpoint
- **Loads from separate YAML file** instead of JSDoc comments

### ✅ Documented API Providers
1. **WeatherAPI.com**
   - `/weatherapi/current` - Get current weather
   - `/weatherapi/forecast` - Get weather forecast

2. **OpenWeatherMap**
   - `/openweathermap/current` - Get current weather  
   - `/openweathermap/forecast` - Get weather forecast

3. **Tomorrow.io**
   - `/tomorrow/current` - Get current weather
   - `/tomorrow/forecast` - Get weather forecast

### ✅ API Information Endpoint
- `/` - General information about API and endpoints

## 🚀 How to Use Swagger UI

### 1. Start the server
```bash
npm start
```

### 2. Open Swagger UI
Visit: http://localhost:3000/api-docs

### 3. Test API endpoints
1. **Select endpoint** from the list
2. **Click "Try it out"** 
3. **Enter parameters** (example: city="Ho Chi Minh City")
4. **Click "Execute"** to send the request
5. **View response** with real data

## 📊 Usage Examples

### Current Weather
```
GET /weatherapi/current?city=Ho Chi Minh City
GET /openweathermap/current?city=Hanoi  
GET /tomorrow/current?city=Danang
```

### Weather Forecast
```
GET /weatherapi/forecast?city=Ho Chi Minh City&days=5
GET /openweathermap/forecast?city=Hanoi&days=3
GET /tomorrow/forecast?city=Danang&days=7
```

## 🔧 Configuration Files

### Swagger Config
- `config/swagger.js` - Main Swagger configuration, loads from YAML file
- `swagger.yaml` - **Main YAML file** containing complete API documentation
- Schema definitions, parameters, responses
- Server configuration and API info

### YAML Structure
- **OpenAPI 3.0.0** specification
- Components: predefined schemas and parameters
- Paths: all endpoints with detailed parameters and responses
- **No JSDoc comments needed** in route files anymore

### Route Files
- `routes/*.js` - Contains only simple routing logic
- **Removed** all JSDoc `@swagger` annotations
- Clean code, focused on business logic

## 🌟 Key Features

### ✨ Interactive Testing
- Test API directly from browser
- No need for external tools like Postman
- Response time and status codes

### ✨ YAML-based Documentation
- **Separate YAML file**: `swagger.yaml` contains all documentation
- **Separation of concerns**: Code logic separated from documentation
- **Easy maintenance**: Edit API docs without touching code
- **Standard format**: OpenAPI 3.0.0 specification standard

### ✨ Clean Code Architecture
- **No JSDoc clutter**: Route files are clean, no long comments
- **Centralized docs**: All documentation in one place
- **Version control friendly**: YAML file easy to track changes

### ✨ Multiple Weather Providers
- Compare data from 3 different providers
- Same input parameter format
- Easy to switch between services

## 🎨 UI Customization
- Hide default Swagger UI topbar
- Custom site title: "Weather API Documentation"
- Explorer mode enabled
- Clean, professional appearance

## 🔍 API Information Endpoint
The `/` endpoint provides:
- General API overview
- List of all endpoints
- Usage examples
- Supported cities and parameters

## 📝 Notes
- **YAML-first approach**: Documentation is written in `swagger.yaml`
- API keys are loaded from environment variables
- Full support for Vietnamese cities/provinces
- Consistent response format across providers
- Complete error handling and validation
- **Clean separation**: Business logic separated from documentation

## 🆚 Comparison with JSDoc Approach

### ✅ YAML File Approach (Current)
- Documentation centralized in one file
- Doesn't clutter code with long comments
- Easy to maintain and update
- Standard OpenAPI format
- Better version control

### ❌ JSDoc Approach (Old)
- Comments scattered across multiple files
- Code becomes cluttered
- Hard to maintain when API changes
- Non-standard format

## 🔄 Workflow for Editing API Documentation

1. **Add new endpoint**:
   - Edit `swagger.yaml`
   - Add path, parameters, responses
   - Server automatically reloads

2. **Update schema**:
   - Edit in `components/schemas`
   - Reference in multiple endpoints

3. **No code changes needed**:
   - Route files don't need changes
   - Documentation is completely independent

## 🚀 Quick Start Testing
1. Open http://localhost:3000/api-docs
2. Try the `/weatherapi/current` endpoint
3. Enter city: "Ho Chi Minh City"
4. Execute and see the results!

---
*Documentation is completely defined in YAML file (`swagger.yaml`) - Clean, maintainable and follows OpenAPI 3.0.0 standard*
