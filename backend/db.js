import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "file_upload",
    });
    console.log("MongoDB Atlas connected");
  } catch (err) {
    console.error("Mongo connection error:", err);
    process.exit(1);
  }
};
