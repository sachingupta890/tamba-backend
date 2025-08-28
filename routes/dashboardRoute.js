import express from "express";
import { getStats } from "../controller/dashboardController.js";
import { protect, admin } from "../middleware/authMiddleware.js";


const router = express.Router();
// GET /api/dashboard/stats
// This route is protected and only accessible by admins.
router.get("/stats", protect, admin, getStats);

export default router;
