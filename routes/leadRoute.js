import express from "express";
import { getRecent, createNewLead, getUserLeads, getAllLeadsAdmin, updateStatus } from "../controller/leadController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import upload from "../config/cloudinary.js";

const router = express.Router();

// --- PUBLIC ROUTE ---
// User can submit a request with or without being logged in.
// Auth is checked manually inside the controller.
router.post("/", protect, upload.single('customImage'), createNewLead);

// --- USER PROTECTED ROUTE ---
// User must be logged in to see their own requests.
router.get("/my-requests", protect, getUserLeads);

// --- ADMIN PROTECTED ROUTES ---
// Admin-only routes to manage and view leads.
router.get("/recent", protect, admin, getRecent);
router.get("/all", protect, admin, getAllLeadsAdmin);
router.put("/:leadId/status", protect, admin, updateStatus);

export default router;
