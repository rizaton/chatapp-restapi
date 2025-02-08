import mongoose from "mongoose";
import dotenv from "dotenv";
import { writeLogToFile } from "../utils/logUtils.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("[/] MongoDB Connected");
  } catch (error) {
    writeLogToFile(error);
    console.error("[X] MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;
