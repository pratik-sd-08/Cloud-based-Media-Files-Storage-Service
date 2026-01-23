import express from "express";
import multer from "multer";
import { storage } from "../config/gridfs.js";
import { authMiddleware } from "../middleware/auth.js";

const upload = multer({ storage });
const router = express.Router();

router.post("/", authMiddleware, upload.single("file"), (req, res) => {
  res.json({ message: "Uploaded" });
});

export default router;
