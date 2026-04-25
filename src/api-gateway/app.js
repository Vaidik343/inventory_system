const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Auth
app.use("/auth", createProxyMiddleware({
  target: "http://localhost:7001",
  changeOrigin: true,
}));

// Inventory
app.use("/inventory", createProxyMiddleware({
  target: "http://localhost:7002",
  changeOrigin: true,
}));

// Sales
app.use("/sales", createProxyMiddleware({
  target: "http://localhost:7003",
  changeOrigin: true,
}));

app.listen(7000, () =>
  console.log("API Gateway running on 7000")
);
