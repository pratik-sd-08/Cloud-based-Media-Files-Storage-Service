import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./db.js";
import authRoutes from "./routes/auth.js";
import uploadRoutes from "./routes/upload.js";
import fileRoutes from "./routes/files.js";

dotenv.config();

const app = express();

/* ---------- DATABASE CONNECTION ---------- */
connectDB();

/* ---------- MIDDLEWARE ---------- */
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

/* ---------- ROUTES ---------- */
app.use("/auth", authRoutes);
app.use("/upload", uploadRoutes);
app.use("/files", fileRoutes);

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 3200;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
