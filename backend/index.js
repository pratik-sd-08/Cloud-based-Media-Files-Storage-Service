import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";
import uploadRoutes from "./routes/upload.js";
import fileRoutes from "./routes/files.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"));

app.use("/auth", authRoutes);
app.use("/upload", uploadRoutes);
app.use("/files", fileRoutes);

app.listen(3200, () => console.log("Server running on 3200"));
