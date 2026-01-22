import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import uploadRoutes from "./routes/upload.js"; // 🔴 YOU MISSED THIS

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("Mongo error:", err);
    process.exit(1);
  });

// 🔑 ROUTES
app.use("/auth", authRoutes);
app.use("/upload", uploadRoutes); // 🔴 THIS LINE FIXES EVERYTHING

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(3200, () => {
  console.log("Server running on port 3200");
});
