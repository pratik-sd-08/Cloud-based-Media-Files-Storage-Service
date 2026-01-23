import express from "express";
import mongoose from "mongoose";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

const bucket = () =>
  new mongoose.mongo.GridFSBucket(
    mongoose.connection.db,
    { bucketName: "uploads" }
  );


router.get("/", authMiddleware, async (req, res) => {
  const files = await mongoose.connection.db
    .collection("uploads.files")
    .find()
    .toArray();

  res.json(files);
});


router.get("/download/:id", (req, res) => {
  bucket()
    .openDownloadStream(new mongoose.Types.ObjectId(req.params.id))
    .pipe(res);
});


router.get("/share/:id", authMiddleware, (req, res) => {
  res.json({
    link: `http://localhost:5173/shared/${req.params.id}`
  });
});

export default router;
