// src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import { envConfig } from "../config/envConfig.js";
import User from "../models/user.js";

// Middleware to verify the JWT token
export const protect = async (req, res, next) => {
  let token;

  // Read the JWT from the httpOnly cookie
  token = req.cookies.token;

  if (token) {
    try {
      // Verify token
      const decoded = jwt.verify(token, envConfig.jwtSecret);

      // Get user from the token (excluding the password)
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Middleware to check for admin role
export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};
