# Weather API Project Structure

Dự án đã được tái cấu trúc theo mô hình MVC (Model-View-Controller) để tách biệt logic nghiệp vụ và routing.

## Cấu trúc thư mục

```
Test-Weather-Api/
├── controllers/           # Chứa các controller xử lý logic nghiệp vụ
│   ├── tomorrowController.js
│   ├── openweathermapController.js
│   └── weatherapiController.js
├── routes/               # Chứa các router định tuyến endpoints
│   ├── index.js
│   ├── users.js
│   ├── tomorrow.js
│   ├── openweathermap.js
│   └── weatherapi.js
├── public/               # Static files
├── bin/                  # Executable files
├── app.js               # Main application file
├── package.json
└── README.md
```

## Controllers

### tomorrowController.js
Xử lý logic cho Tomorrow.io Weather API:
- `getCurrentWeather()` - Lấy thời tiết hiện tại
- `getForecastWeather()` - Lấy dự báo thời tiết theo ngày
- `getCoords()` - Utility function để lấy tọa độ từ tên thành phố
- `cityToCoords` - Object chứa mapping tọa độ các thành phố Việt Nam

### openweathermapController.js
Xử lý logic cho OpenWeatherMap API:
- `getCurrentWeather()` - Lấy thời tiết hiện tại
- `getForecastWeather()` - Lấy dự báo thời tiết theo ngày

### weatherapiController.js
Xử lý logic cho WeatherAPI.com:
- `getCurrentWeather()` - Lấy thời tiết hiện tại
- `getForecastWeather()` - Lấy dự báo thời tiết theo ngày

## Routes

### tomorrow.js
Định tuyến cho Tomorrow.io API:
- `GET /current` - Thời tiết hiện tại
- `GET /forecast` - Dự báo thời tiết

### openweathermap.js
Định tuyến cho OpenWeatherMap API:
- `GET /current` - Thời tiết hiện tại
- `GET /forecast` - Dự báo thời tiết

### weatherapi.js
Định tuyến cho WeatherAPI.com:
- `GET /current` - Thời tiết hiện tại
- `GET /forecast` - Dự báo thời tiết

## Lợi ích của việc tái cấu trúc

1. **Separation of Concerns**: Logic nghiệp vụ được tách riêng khỏi routing
2. **Reusability**: Các controller có thể được tái sử dụng trong các route khác
3. **Maintainability**: Dễ dàng bảo trì và cập nhật code
4. **Testability**: Dễ dàng viết unit test cho từng controller
5. **Scalability**: Dễ dàng mở rộng thêm tính năng mới

## Environment Variables

Đảm bảo các biến môi trường sau được cấu hình trong file `.env`:

```
TOMORROW_API_KEY=your_tomorrow_api_key
OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
WEATHER_API_KEY=your_weatherapi_key
```

## Usage

Các endpoint vẫn hoạt động như trước:

- Tomorrow.io: `/tomorrow/current?city=Hanoi`, `/tomorrow/forecast?city=Hanoi&days=3`
- OpenWeatherMap: `/openweathermap/current?city=Hanoi`, `/openweathermap/forecast?city=Hanoi&days=3`
- WeatherAPI: `/weatherapi/current?city=Hanoi`, `/weatherapi/forecast?city=Hanoi&days=3`
