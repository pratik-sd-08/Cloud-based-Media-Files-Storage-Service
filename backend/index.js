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
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));



app.use("/auth", authRoutes);
app.use("/upload", uploadRoutes);
app.use("/files", fileRoutes);



const PORT = process.env.PORT || 3200;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
