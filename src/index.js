import express from "express";

const app = express();

// ✅ Endpoint mặc định
app.get("/", (_req, res) => {
  res.send("Hello DevSecOps from Jenkins!");
});

// ✅ Endpoint kiểm tra sức khỏe ứng dụng
app.get("/health", (_req, res) => {
  res.json({ status: "ok", message: "App is healthy 🚀" });
});

const PORT = 3000;

// ✅ Cho phép lắng nghe tất cả IP (truy cập được từ bên ngoài container)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
