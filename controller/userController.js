import {
  registerUser,
  loginUser,
  logoutUserService,
  getAllUsers,
} from "../services/userService.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    const user = await registerUser({ name, email, password, phone });
    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message || "Registration failed" });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const { token, user } = await loginUser({ email, password });

    // Set token in a secure, httpOnly cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: true, // Production mein hamesha true
        sameSite: "None", // Cross-domain ke liye zaroori
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 din
      });

    res.status(200).json({
      message: "Logged in successfully",
      user,
    });
  } catch (error) {
    res.status(401).json({ message: error.message || "Login failed" });
  }
};

export const logout = async (req, res) => {
  try {
    const result = await logoutUserService(res);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || "Logout failed" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server error while fetching users",
        error: error.message,
      });
  }
};
