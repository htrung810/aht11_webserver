// Khởi tạo đồ thị gauge cho nhiệt độ
var tempGauge = new JustGage({
  id: "temp-gauge",
  value: 20, // Giá trị ban đầu
  min: -20, // Giá trị tối thiểu
  max: 40, // Giá trị tối đa
  title: "Nhiệt độ", // Tiêu đề
  label: "°C", // Đơn vị
  decimals: 1, // Số chữ số sau dấu phẩy
});

// Khởi tạo đồ thị gauge cho độ ẩm
var humidityGauge = new JustGage({
  id: "humidity-gauge",
  value: 50, // Giá trị ban đầu
  min: 0, // Giá trị tối thiểu
  max: 100, // Giá trị tối đa
  title: "Độ ẩm", // Tiêu đề
  label: "%", // Đơn vị
  decimals: 1, // Số chữ số sau dấu phẩy
});

// Cập nhật giá trị đồ thị gauge cho nhiệt độ
tempGauge.refresh(25);

// Cập nhật giá trị đồ thị gauge cho độ ẩm
humidityGauge.set(60);
