import dotenv from "dotenv";

dotenv.config("./env");


export const envConfig = {
  port: process.env.PORT || 3333,
  db: process.env.MONGO_URI || "",
  jwtSecret: process.env.JWT_SECRET || "TAMBA",

  //cloudinary
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
};

