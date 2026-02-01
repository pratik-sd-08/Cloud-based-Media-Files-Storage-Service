import express from "express";
import mongoose from "mongoose";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

const bucket = () =>
  new mongoose.mongo.GridFSBucket(
    mongoose.connection.db,
    { bucketName: "uploads" }
  );

/* ---------- GET USER FILES ---------- */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const files = await mongoose.connection.db
      .collection("uploads.files")
      .find({ "metadata.userId": req.user.id }) // filter by logged-in user
      .toArray();

    res.json(files);
  } catch (err) {
    res.status(500).json({ message: "Error fetching files" });
  }
});

/* ---------- DOWNLOAD FILE ---------- */
router.get("/download/:id", authMiddleware, (req, res) => {
  bucket()
    .openDownloadStream(new mongoose.Types.ObjectId(req.params.id))
    .pipe(res);
});

/* ---------- SHARE LINK ---------- */
router.get("/share/:id", authMiddleware, (req, res) => {
  res.json({
    link: `${process.env.CLIENT_URL}/shared/${req.params.id}`,
  });
});

export default router;
