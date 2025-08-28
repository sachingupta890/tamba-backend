import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/envConfig.js";

export const registerUser = async ({ name, email, password, phone }) => {
  // check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = new User({
    name,
    email,
    password: hashedPassword,
    phone,
  });

  await user.save();

  // return safe data
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };
};


export const loginUser = async ({ email, password }) => {
  // 1. Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  // 2. Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // 3. Create JWT Payload
  const payload = {
    id: user._id,
    name: user.name,
    role: user.role,
  };

  // 4. Sign the token
  const token = jwt.sign(payload, envConfig.jwtSecret, {
    expiresIn: "1d", // Token expires in 1 day
  });

  return { token, user: payload };
};

export const logoutUserService = async (res) => {

  try {
      res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return { message: "Logged out successfully" };
  }
  catch (error) {
    throw error;
  }


};

export const getAllUsers = async () => {
  try {
    // Find all users and exclude the password field for security
    // Sort by creation date to show newest users first
    const users = await User.find({})
      .select("-password")
      .sort({ createdAt: -1 });
    return users;
  } catch (error) {
    console.error("Error in getAllUsers service:", error);
    throw new Error("Error fetching users from the database.");
  }
};

