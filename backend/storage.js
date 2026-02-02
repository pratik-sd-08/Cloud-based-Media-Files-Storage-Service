import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";
dotenv.config();

export const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req) => ({
    filename: Date.now().toString(),
    bucketName: "uploads",
    metadata: {
      userId: req.user.id,   // VERY IMPORTANT
    },
  }),
});
