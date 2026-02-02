import express from "express";
import mongoose from "mongoose";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const files = await mongoose.connection.db
      .collection("uploads.files")
      .find({ "metadata.userId": req.user.id })
      .toArray();

    res.json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching files" });
  }
});


router.get("/download/:id", authMiddleware, async (req, res) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.id);

    const file = await mongoose.connection.db
      .collection("uploads.files")
      .findOne({ _id: fileId });

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const bucket = new mongoose.mongo.GridFSBucket(
      mongoose.connection.db,
      { bucketName: "uploads" }
    );

    bucket.openDownloadStream(fileId).pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Download error" });
  }
});


router.get("/share/:id", authMiddleware, async (req, res) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.id);

    const file = await mongoose.connection.db
      .collection("uploads.files")
      .findOne({ _id: fileId });

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    res.json({
      link: `${process.env.CLIENT_URL}/shared/${fileId}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Share error" });
  }
});

export default router;
