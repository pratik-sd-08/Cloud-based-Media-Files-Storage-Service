import express from "express";
import multer from "multer";
import { storage } from "../config/storage.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();
const upload = multer({ storage });

router.post("/", authMiddleware, upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.json({
    message: "File uploaded successfully",
    fileId: req.file.id,          // important
    filename: req.file.filename, // useful for UI
  });
});

export default router;
