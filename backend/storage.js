import dotenv from "dotenv";
dotenv.config();

import { GridFsStorage } from "multer-gridfs-storage";
import crypto from "crypto";
import path from "path";

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is missing. Check your .env file.");
}

export const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) return reject(err);

        resolve({
          filename: buf.toString("hex") + path.extname(file.originalname),
          bucketName: "uploads"
        });
      });
    });
  }
});
