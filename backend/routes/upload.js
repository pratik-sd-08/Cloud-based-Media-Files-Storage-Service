import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const bucket = () =>
  new GridFSBucket(mongoose.connection.db, {
    bucketName: "uploads",
  });

router.post("/", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploadStream = bucket().openUploadStream(
      req.file.originalname,
      {
        metadata: {
          userId: req.user.id,
        },
      }
    );

    uploadStream.end(req.file.buffer);

    uploadStream.on("finish", () => {
      res.json({ message: "File uploaded successfully" });
    });

    uploadStream.on("error", (err) => {
      console.error(err);
      res.status(500).json({ message: "Upload error" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
