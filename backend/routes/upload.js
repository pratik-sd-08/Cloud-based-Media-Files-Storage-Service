import express from "express";
import multer from "multer";
import { storage } from "../config/gridfs.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

/*
  Multer configured with GridFS storage
*/
const upload = multer({ storage });

/*
  POST /upload
  Protected route
*/
router.post(
  "/",
  authMiddleware,
  upload.single("file"),
  (req, res) => {
    console.log("UPLOAD REQUEST RECEIVED");
    console.log("REQ.FILE =", req.file);

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded (req.file is undefined)",
      });
    }

    return res.status(201).json({
      message: "File uploaded successfully",
      filename: req.file.filename,
      id: req.file.id,
      bucket: req.file.bucketName,
    });
  }
);

export default router;
