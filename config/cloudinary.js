import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import { envConfig } from "./envConfig.js";

// Configure Cloudinary
cloudinary.config(envConfig.cloudinary);

// Configure Multer to use Cloudinary for storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "tamba-products", // A folder name in your Cloudinary account
    allowed_formats: ["jpeg", "png", "jpg", "webp"],
  },
});

// Create the multer instance
const upload = multer({ storage: storage });

export default upload;
