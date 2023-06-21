import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
dotenv.config();

const connect = async () => {
  try { 
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

const corsOptions = {
  origin: 'https://zoudeyi-admin-airpnb.onrender.com', 
  credentials: true,
};

//middlewares
app.use(cors(corsOptions));// 指定可访问的前端应用的URL

app.use(cors()) // 用proxy（client package）的时候不必用到
app.use(cookieParser()) // 将jwt放入cookie中
app.use(express.json());//将 Express 服务器配置为解析 JSON 格式的请求体

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use(express.static(path.join(__dirname, "/client/build")));
app.use(express.static(path.join(__dirname, "/admin/build")));

app.get('/admin*', (req, res) => {
  res.sendFile(path.join(__dirname, '/admin/build', 'index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});



app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.PORT ||
  8800, () => {
  connect();
  console.log("Connected to backend.");
});
