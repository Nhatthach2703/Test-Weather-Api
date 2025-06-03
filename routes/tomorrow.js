const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = process.env.TOMORROW_API_KEY;

// Lấy tọa độ từ thành phố (sử dụng tạm định nghĩa cứng một số TP Việt Nam)
const cityToCoords = {
  Hanoi: { lat: 21.0285, lon: 105.8542 },
  'Ho Chi Minh': { lat: 10.762622, lon: 106.660172 },
  Danang: { lat: 16.047079, lon: 108.20623 },
  Haiphong: { lat: 20.844911, lon: 106.688084 },
  Cantho: { lat: 10.045162, lon: 105.746857 },
  Hue: { lat: 16.463713, lon: 107.590866 },
  Nhatrang: { lat: 12.238791, lon: 109.196749 },
  Vungtau: { lat: 10.411379, lon: 107.136227 },
  QuyNhon: { lat: 13.782289, lon: 109.219272 },
  PhanThiet: { lat: 10.928089, lon: 108.102081 },
  Dalat: { lat: 11.940419, lon: 108.458313 },
  BuonMaThuot: { lat: 12.666667, lon: 108.050003 },
  Pleiku: { lat: 13.983333, lon: 108.000000 },
  RachGia: { lat: 10.01245, lon: 105.08091 },
  CaMau: { lat: 9.17682, lon: 105.15242 },
  Vinh: { lat: 18.679585, lon: 105.681335 },
  ThanhHoa: { lat: 19.807942, lon: 105.776333 },
  HaLong: { lat: 20.950109, lon: 107.073359 },
  ThaiNguyen: { lat: 21.594222, lon: 105.848068 },
  BacNinh: { lat: 21.186082, lon: 106.07643 },
  NamDinh: { lat: 20.438822, lon: 106.162105 },
  HaNam: { lat: 20.541111, lon: 105.914722 },
  NinhBinh: { lat: 20.250614, lon: 105.974453 },
  LaoCai: { lat: 22.48556, lon: 103.97067 },
  SonLa: { lat: 21.3256, lon: 103.9188 },
  DienBien: { lat: 21.386, lon: 103.023 },
  HoaBinh: { lat: 20.8171, lon: 105.3376 },
  LangSon: { lat: 21.8526, lon: 106.761 },
  BacGiang: { lat: 21.2731, lon: 106.1946 },
  QuangNinh: { lat: 21.006382, lon: 107.292514 },
  QuangNam: { lat: 15.539353, lon: 108.019102 },
  QuangNgai: { lat: 15.120152, lon: 108.792236 },
  BinhDinh: { lat: 14.166532, lon: 108.902683 },
  PhuYen: { lat: 13.088186, lon: 109.092876 },
  BinhThuan: { lat: 11.09037, lon: 108.07208 },
  BinhPhuoc: { lat: 11.7512, lon: 106.7235 },
  TayNinh: { lat: 11.3116, lon: 106.0986 },
  DongNai: { lat: 10.945272, lon: 106.824005 },
  BinhDuong: { lat: 11.3254, lon: 106.477 },
  LongAn: { lat: 10.5355, lon: 106.4137 },
  TienGiang: { lat: 10.44911, lon: 106.34205 },
  BenTre: { lat: 10.24147, lon: 106.37591 },
  TraVinh: { lat: 9.9345, lon: 106.3452 },
  SocTrang: { lat: 9.6031, lon: 105.9719 },
  BacLieu: { lat: 9.2941, lon: 105.7278 },
  HauGiang: { lat: 9.7579, lon: 105.6411 },
  KienGiang: { lat: 10.0093, lon: 105.0809 },
  AnGiang: { lat: 10.5216, lon: 105.1259 },
  DongThap: { lat: 10.4936, lon: 105.6889 },
  VinhLong: { lat: 10.2538, lon: 105.9722 },
  QuangTri: { lat: 16.8163, lon: 107.1003 },
  QuangBinh: { lat: 17.4689, lon: 106.6223 },
  HaTinh: { lat: 18.3428, lon: 105.9057 },
  TuyenQuang: { lat: 21.8236, lon: 105.214 },
  YenBai: { lat: 21.7056, lon: 104.8705 },
  PhuTho: { lat: 21.345, lon: 105.213 },
  BacKan: { lat: 22.147, lon: 105.834 },
  CaoBang: { lat: 22.6657, lon: 106.2579 },
  LaiChau: { lat: 22.3964, lon: 103.4586 },
  HaGiang: { lat: 22.8233, lon: 104.9836 },
  GiaLai: { lat: 13.8079, lon: 108.1098 },
  KonTum: { lat: 14.3498, lon: 108.0005 },
  LamDong: { lat: 11.5753, lon: 108.1429 },
  BinhPhuoc: { lat: 11.7512, lon: 106.7235 },
  CaMau: { lat: 9.17682, lon: 105.15242 },
  BacGiang: { lat: 21.2731, lon: 106.1946 },
  BacKan: { lat: 22.147, lon: 105.834 },
  BacLieu: { lat: 9.2941, lon: 105.7278 },
  BacNinh: { lat: 21.186082, lon: 106.07643 },
  BenTre: { lat: 10.24147, lon: 106.37591 },
  BinhDinh: { lat: 14.166532, lon: 108.902683 },
  BinhDuong: { lat: 11.3254, lon: 106.477 },
  BinhPhuoc: { lat: 11.7512, lon: 106.7235 },
  BinhThuan: { lat: 11.09037, lon: 108.07208 },
  CaMau: { lat: 9.17682, lon: 105.15242 },
  CanTho: { lat: 10.045162, lon: 105.746857 },
  CaoBang: { lat: 22.6657, lon: 106.2579 },
  DaNang: { lat: 16.047079, lon: 108.20623 },
  DakLak: { lat: 12.710011, lon: 108.237751 },
  DakNong: { lat: 12.264647, lon: 107.60981 },
  DienBien: { lat: 21.386, lon: 103.023 },
  DongNai: { lat: 10.945272, lon: 106.824005 },
  DongThap: { lat: 10.4936, lon: 105.6889 },
  GiaLai: { lat: 13.8079, lon: 108.1098 },
  HaGiang: { lat: 22.8233, lon: 104.9836 },
  HaNam: { lat: 20.541111, lon: 105.914722 },
  HaNoi: { lat: 21.0285, lon: 105.8542 },
  HaTinh: { lat: 18.3428, lon: 105.9057 },
  HaiDuong: { lat: 20.937341, lon: 106.314554 },
  HaiPhong: { lat: 20.844911, lon: 106.688084 },
  HauGiang: { lat: 9.7579, lon: 105.6411 },
  HoaBinh: { lat: 20.8171, lon: 105.3376 },
  HungYen: { lat: 20.6463, lon: 106.0511 },
  KhanhHoa: { lat: 12.238791, lon: 109.196749 },
  KienGiang: { lat: 10.0093, lon: 105.0809 },
  KonTum: { lat: 14.3498, lon: 108.0005 },
  LaiChau: { lat: 22.3964, lon: 103.4586 },
  LamDong: { lat: 11.5753, lon: 108.1429 },
  LangSon: { lat: 21.8526, lon: 106.761 },
  LaoCai: { lat: 22.48556, lon: 103.97067 },
  LongAn: { lat: 10.5355, lon: 106.4137 },
  NamDinh: { lat: 20.438822, lon: 106.162105 },
  NgheAn: { lat: 19.234249, lon: 104.920036 },
  NinhBinh: { lat: 20.250614, lon: 105.974453 },
  NinhThuan: { lat: 11.673876, lon: 108.862457 },
  PhuTho: { lat: 21.345, lon: 105.213 },
  PhuYen: { lat: 13.088186, lon: 109.092876 },
  QuangBinh: { lat: 17.4689, lon: 106.6223 },
  QuangNam: { lat: 15.539353, lon: 108.019102 },
  QuangNgai: { lat: 15.120152, lon: 108.792236 },
  QuangNinh: { lat: 21.006382, lon: 107.292514 },
  QuangTri: { lat: 16.8163, lon: 107.1003 },
  SocTrang: { lat: 9.6031, lon: 105.9719 },
  SonLa: { lat: 21.3256, lon: 103.9188 },
  TayNinh: { lat: 11.3116, lon: 106.0986 },
  ThaiBinh: { lat: 20.4463, lon: 106.3366 },
  ThaiNguyen: { lat: 21.594222, lon: 105.848068 },
  ThanhHoa: { lat: 19.807942, lon: 105.776333 },
  ThuaThienHue: { lat: 16.463713, lon: 107.590866 },
  TienGiang: { lat: 10.44911, lon: 106.34205 },
  TraVinh: { lat: 9.9345, lon: 106.3452 },
  TuyenQuang: { lat: 21.8236, lon: 105.214 },
  VinhLong: { lat: 10.2538, lon: 105.9722 },
  VinhPhuc: { lat: 21.3089, lon: 105.6049 },
  VungTau: { lat: 10.411379, lon: 107.136227 }
};

function getCoords(city) {
  return cityToCoords[city] || null;
}

// Thời tiết hiện tại
router.get('/current', async (req, res) => {
  const { city } = req.query;
  const coords = getCoords(city);
  if (!coords) return res.status(400).json({ error: 'City not supported' });

  try {
    const url = `https://api.tomorrow.io/v4/weather/realtime`;
    const response = await axios.get(url, {
      params: {
        location: `${coords.lat},${coords.lon}`,
        apikey: API_KEY,
      },
    });

    const data = response.data.data;
    res.json({
      // Trả về dữ liệu thời tiết hiện tại, những thông tin bị comment lại là bị null
      city,
      temperature: data.values.temperature, // Nhiệt độ thực tế (°C)
      temperatureApparent: data.values.temperatureApparent, // Nhiệt độ cảm nhận (°C)
      dewPoint: data.values.dewPoint, // Điểm sương (°C)
      humidity: data.values.humidity, // Độ ẩm không khí (%)
      pressureSeaLevel: data.values.pressureSeaLevel, // Áp suất tại mực nước biển (hPa)
      pressureSurfaceLevel: data.values.pressureSurfaceLevel, // Áp suất tại mặt đất (hPa)
      windSpeed: data.values.windSpeed, // Tốc độ gió (m/s)
      windDirection: data.values.windDirection, // Hướng gió (độ, 0=Bắc, 90=Đông, 180=Nam, 270=Tây)
      windGust: data.values.windGust, // Gió giật (m/s)
      cloudCover: data.values.cloudCover, // Độ che phủ mây (%)
      // precipitationIntensity: data.values.precipitationIntensity, // Cường độ mưa (mm/h)
      // precipitationType: data.values.precipitationType, // Loại mưa (1=mưa, 2=mưa tuyết, 3=tuyết, 4=mưa đá, 5=mưa lạnh, 6=không mưa)
      visibility: data.values.visibility, // Tầm nhìn xa (km)
      uvIndex: data.values.uvIndex, // Chỉ số UV
      weatherCode: data.values.weatherCode, // Mã thời tiết tổng quát
      // weatherCodeFullDay: data.values.weatherCodeFullDay, // Mã thời tiết cả ngày
      // weatherCodeDay: data.values.weatherCodeDay, // Mã thời tiết ban ngày
      // weatherCodeNight: data.values.weatherCodeNight, // Mã thời tiết ban đêm
      // sunriseTime: data.values.sunriseTime, // Thời gian mặt trời mọc (ISO 8601)
      // sunsetTime: data.values.sunsetTime, // Thời gian mặt trời lặn (ISO 8601)
      // snowDepth: data.values.snowDepth, // Độ dày tuyết (cm)
      // soilMoisture: data.values.soilMoisture, // Độ ẩm đất (m³/m³)
      // evapotranspiration: data.values.evapotranspiration, // Lượng bốc hơi (mm)
      // pollenIndexTree: data.values.pollenIndexTree, // Chỉ số phấn hoa cây (0-5)
      // pollenIndexWeed: data.values.pollenIndexWeed, // Chỉ số phấn hoa cỏ dại (0-5)
      // pollenIndexGrass: data.values.pollenIndexGrass, // Chỉ số phấn hoa cỏ (0-5)
      // airQualityIndex: data.values.airQualityIndex, // Chỉ số chất lượng không khí (AQI)
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch current weather' });
  }
});

// Dự báo theo ngày
router.get('/forecast', async (req, res) => {
  const { city, days = 3 } = req.query;

  // Bảng tọa độ các thành phố Việt Nam (có thể thêm/bớt)
  const cityToCoords = {
    Hanoi: { lat: 21.0285, lon: 105.8542 },
    "Ho Chi Minh": { lat: 10.762622, lon: 106.660172 },
    Danang: { lat: 16.047079, lon: 108.20623 },
    Haiphong: { lat: 20.844911, lon: 106.688084 },
    Cantho: { lat: 10.045162, lon: 105.746857 },
    Hue: { lat: 16.463713, lon: 107.590866 },
    Nhatrang: { lat: 12.238791, lon: 109.196749 },
    Vungtau: { lat: 10.411379, lon: 107.136227 },
    QuyNhon: { lat: 13.782289, lon: 109.219272 },
    PhanThiet: { lat: 10.928089, lon: 108.102081 },
    Dalat: { lat: 11.940419, lon: 108.458313 },
    BuonMaThuot: { lat: 12.666667, lon: 108.050003 },
    Pleiku: { lat: 13.983333, lon: 108.000000 },
    RachGia: { lat: 10.01245, lon: 105.08091 },
    CaMau: { lat: 9.17682, lon: 105.15242 },
    Vinh: { lat: 18.679585, lon: 105.681335 },
    ThanhHoa: { lat: 19.807942, lon: 105.776333 },
    HaLong: { lat: 20.950109, lon: 107.073359 },
    ThaiNguyen: { lat: 21.594222, lon: 105.848068 },
    BacNinh: { lat: 21.186082, lon: 106.07643 },
    NamDinh: { lat: 20.438822, lon: 106.162105 },
    HaNam: { lat: 20.541111, lon: 105.914722 },
    NinhBinh: { lat: 20.250614, lon: 105.974453 },
    LaoCai: { lat: 22.48556, lon: 103.97067 },
    SonLa: { lat: 21.3256, lon: 103.9188 },
    DienBien: { lat: 21.386, lon: 103.023 },
    HoaBinh: { lat: 20.8171, lon: 105.3376 },
    LangSon: { lat: 21.8526, lon: 106.761 },
    BacGiang: { lat: 21.2731, lon: 106.1946 },
    QuangNinh: { lat: 21.006382, lon: 107.292514 },
    QuangNam: { lat: 15.539353, lon: 108.019102 },
    QuangNgai: { lat: 15.120152, lon: 108.792236 },
    BinhDinh: { lat: 14.166532, lon: 108.902683 },
    PhuYen: { lat: 13.088186, lon: 109.092876 },
    BinhThuan: { lat: 11.09037, lon: 108.07208 },
    BinhPhuoc: { lat: 11.7512, lon: 106.7235 },
    TayNinh: { lat: 11.3116, lon: 106.0986 },
    DongNai: { lat: 10.945272, lon: 106.824005 },
    BinhDuong: { lat: 11.3254, lon: 106.477 },
    LongAn: { lat: 10.5355, lon: 106.4137 },
    TienGiang: { lat: 10.44911, lon: 106.34205 },
    BenTre: { lat: 10.24147, lon: 106.37591 },
    TraVinh: { lat: 9.9345, lon: 106.3452 },
    SocTrang: { lat: 9.6031, lon: 105.9719 },
    BacLieu: { lat: 9.2941, lon: 105.7278 },
    HauGiang: { lat: 9.7579, lon: 105.6411 },
    KienGiang: { lat: 10.0093, lon: 105.0809 },
    AnGiang: { lat: 10.5216, lon: 105.1259 },
    DongThap: { lat: 10.4936, lon: 105.6889 },
    VinhLong: { lat: 10.2538, lon: 105.9722 },
    QuangTri: { lat: 16.8163, lon: 107.1003 },
    QuangBinh: { lat: 17.4689, lon: 106.6223 },
    HaTinh: { lat: 18.3428, lon: 105.9057 },
    TuyenQuang: { lat: 21.8236, lon: 105.214 },
    YenBai: { lat: 21.7056, lon: 104.8705 },
    PhuTho: { lat: 21.345, lon: 105.213 },
    BacKan: { lat: 22.147, lon: 105.834 },
    CaoBang: { lat: 22.6657, lon: 106.2579 },
    LaiChau: { lat: 22.3964, lon: 103.4586 },
    HaGiang: { lat: 22.8233, lon: 104.9836 },
    GiaLai: { lat: 13.8079, lon: 108.1098 },
    KonTum: { lat: 14.3498, lon: 108.0005 },
    LamDong: { lat: 11.5753, lon: 108.1429 },
    BinhPhuoc: { lat: 11.7512, lon: 106.7235 },
    CaMau: { lat: 9.17682, lon: 105.15242 },
    BacGiang: { lat: 21.2731, lon: 106.1946 },
    BacKan: { lat: 22.147, lon: 105.834 },
    BacLieu: { lat: 9.2941, lon: 105.7278 },
    BacNinh: { lat: 21.186082, lon: 106.07643 },
    BenTre: { lat: 10.24147, lon: 106.37591 },
    BinhDinh: { lat: 14.166532, lon: 108.902683 },
    BinhDuong: { lat: 11.3254, lon: 106.477 },
    BinhPhuoc: { lat: 11.7512, lon: 106.7235 },
    BinhThuan: { lat: 11.09037, lon: 108.07208 },
    CaMau: { lat: 9.17682, lon: 105.15242 },
    CanTho: { lat: 10.045162, lon: 105.746857 },
    CaoBang: { lat: 22.6657, lon: 106.2579 },
    DaNang: { lat: 16.047079, lon: 108.20623 },
    DakLak: { lat: 12.710011, lon: 108.237751 },
    DakNong: { lat: 12.264647, lon: 107.60981 },
    DienBien: { lat: 21.386, lon: 103.023 },
    DongNai: { lat: 10.945272, lon: 106.824005 },
    DongThap: { lat: 10.4936, lon: 105.6889 },
    GiaLai: { lat: 13.8079, lon: 108.1098 },
    HaGiang: { lat: 22.8233, lon: 104.9836 },
    HaNam: { lat: 20.541111, lon: 105.914722 },
    HaNoi: { lat: 21.0285, lon: 105.8542 },
    HaTinh: { lat: 18.3428, lon: 105.9057 },
    HaiDuong: { lat: 20.937341, lon: 106.314554 },
    HaiPhong: { lat: 20.844911, lon: 106.688084 },
    HauGiang: { lat: 9.7579, lon: 105.6411 },
    HoaBinh: { lat: 20.8171, lon: 105.3376 },
    HungYen: { lat: 20.6463, lon: 106.0511 },
    KhanhHoa: { lat: 12.238791, lon: 109.196749 },
    KienGiang: { lat: 10.0093, lon: 105.0809 },
    KonTum: { lat: 14.3498, lon: 108.0005 },
    LaiChau: { lat: 22.3964, lon: 103.4586 },
    LamDong: { lat: 11.5753, lon: 108.1429 },
    LangSon: { lat: 21.8526, lon: 106.761 },
    LaoCai: { lat: 22.48556, lon: 103.97067 },
    LongAn: { lat: 10.5355, lon: 106.4137 },
    NamDinh: { lat: 20.438822, lon: 106.162105 },
    NgheAn: { lat: 19.234249, lon: 104.920036 },
    NinhBinh: { lat: 20.250614, lon: 105.974453 },
    NinhThuan: { lat: 11.673876, lon: 108.862457 },
    PhuTho: { lat: 21.345, lon: 105.213 },
    PhuYen: { lat: 13.088186, lon: 109.092876 },
    QuangBinh: { lat: 17.4689, lon: 106.6223 },
    QuangNam: { lat: 15.539353, lon: 108.019102 },
    QuangNgai: { lat: 15.120152, lon: 108.792236 },
    QuangNinh: { lat: 21.006382, lon: 107.292514 },
    QuangTri: { lat: 16.8163, lon: 107.1003 },
    SocTrang: { lat: 9.6031, lon: 105.9719 },
    SonLa: { lat: 21.3256, lon: 103.9188 },
    TayNinh: { lat: 11.3116, lon: 106.0986 },
    ThaiBinh: { lat: 20.4463, lon: 106.3366 },
    ThaiNguyen: { lat: 21.594222, lon: 105.848068 },
    ThanhHoa: { lat: 19.807942, lon: 105.776333 },
    ThuaThienHue: { lat: 16.463713, lon: 107.590866 },
    TienGiang: { lat: 10.44911, lon: 106.34205 },
    TraVinh: { lat: 9.9345, lon: 106.3452 },
    TuyenQuang: { lat: 21.8236, lon: 105.214 },
    VinhLong: { lat: 10.2538, lon: 105.9722 },
    VinhPhuc: { lat: 21.3089, lon: 105.6049 },
    VungTau: { lat: 10.411379, lon: 107.136227 }
  };

  const coords = cityToCoords[city];
  if (!coords) return res.status(400).json({ error: 'City not supported' });

  try {
    // Tomorrow.io Forecast API endpoint
    const url = 'https://api.tomorrow.io/v4/timelines';

    // Tham số gửi theo docs:
    // fields: dữ liệu cần lấy (nhiệt độ max/min/avg, độ ẩm, gió,...)
    // timesteps: 1d = mỗi ngày
    // startTime: hiện tại
    // units: metric (để ra độ C, km/h,...)
    const params = {
      apikey: API_KEY,
      location: `${coords.lat},${coords.lon}`,
      fields: [
        'temperatureMax',
        'temperatureMin',
        'temperatureAvg',
        'humidityAvg',
        'windSpeedMax',
        'weatherCode',
      ],
      timesteps: '1d',
      units: 'metric',
      startTime: new Date().toISOString(),
      // Có thể thêm endTime dựa trên days
    };

    const response = await axios.get(url, { params });

    // Dữ liệu timeline nằm trong response.data.data.timelines[0].intervals
    const intervals = response.data.data.timelines[0].intervals;

    // Lấy số ngày theo yêu cầu
    const forecastDays = intervals.slice(0, Number(days)).map(day => ({
      date: day.startTime.split('T')[0],
      temperatureMaxC: day.values.temperatureMax,
      temperatureMinC: day.values.temperatureMin,
      temperatureAvgC: day.values.temperatureAvg,
      humidityAvg: day.values.humidityAvg,
      windSpeedMaxKph: day.values.windSpeedMax,
      weatherCode: day.values.weatherCode,
    }));

    res.json({
      city,
      forecast: forecastDays,
    });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch forecast' });
  }
});

module.exports = router;
