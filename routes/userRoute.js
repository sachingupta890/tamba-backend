import express from "express";
import { getUsers, login, logout, register } from "../controller/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/users/register
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/", protect, admin, getUsers);

export default router;
