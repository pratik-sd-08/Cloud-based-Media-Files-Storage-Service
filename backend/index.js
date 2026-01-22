import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import crypto from "crypto";
import path from "path";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    const storage = new GridFsStorage({
      db: mongoose.connection,
      file: (req, file) =>
        new Promise((resolve, reject) => {
          crypto.randomBytes(16, (err, buf) => {
            if (err) return reject(err);

            resolve({
              filename: buf.toString("hex") + path.extname(file.originalname),
              bucketName: "uploads"
            });
          });
        })
    });

    const upload = multer({ storage });

    app.post("/upload", upload.single("file"), (req, res) => {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      res.status(201).json({
        message: "File stored in MongoDB Atlas (GridFS)"
      });
    });

    app.listen(3200, () =>
      console.log("Server running on port 3200")
    );
  })
  .catch(err => {
    console.error("DB ERROR:", err);
    process.exit(1);
  });
