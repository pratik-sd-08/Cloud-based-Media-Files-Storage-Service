import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const bucket = new mongoose.mongo.GridFSBucket(
      mongoose.connection.db,
      { bucketName: "uploads" }
    );

    const uploadStream = bucket.openUploadStream(req.file.originalname, {
      metadata: { userId: req.user.id },
    });

    uploadStream.end(req.file.buffer);

    uploadStream.on("finish", () => {
      res.json({ message: "File uploaded successfully" });
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload error" });
  }
});

export default router;
