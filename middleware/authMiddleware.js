// src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import { envConfig } from "../config/envConfig.js";
import User from "../models/user.js";

// Middleware to verify the JWT token
// export const protect = async (req, res, next) => {
//   let token;

//   // Read the JWT from the httpOnly cookie
//   token = req.cookies.token;

//   if (token) {
//     try {
//       // Verify token
//       const decoded = jwt.verify(token, envConfig.jwtSecret);

//       // Get user from the token (excluding the password)
//       req.user = await User.findById(decoded.id).select("-password");

//       next();
//     } catch (error) {
//       console.error(error);
//       res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   } else {
//     res.status(401).json({ message: "Not authorized, no token" });
//   }
// };

export const protect = async (req, res, next) => {
  let token;

  // --- YEH SABSE IMPORTANT CHANGE HAI ---
  // Pehle Authorization header se token read karein
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, envConfig.jwtSecret);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    // Agar header mein token nahi hai, toh cookie se try karein (optional fallback)
    token = req.cookies.token;
    if (token) {
      // ... (cookie wala logic)
    } else {
      res.status(401).json({ message: "Not authorized, no token" });
    }
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
