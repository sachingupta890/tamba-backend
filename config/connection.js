import { MongoClient, ServerApiVersion } from "mongodb"
import { envConfig } from "./envConfig.js";
import mongoose from "mongoose";


const uri = envConfig.db;


async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected successfully!"); // return client for use in other files
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
}
export {connectDB}
