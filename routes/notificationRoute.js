import express from "express";
import {
  getNotifications,
  markAsRead,
} from "../controller/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getNotifications);
router.put("/read", protect, markAsRead);

export default router;
