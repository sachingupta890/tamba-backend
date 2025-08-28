import express from "express";
import { getUserWishlist, toggleWishlist } from "../controller/wishlistController.js";
import { protect } from "../middleware/authMiddleware.js"; // Only logged-in users can wishlist

const router = express.Router();

// POST /api/wishlist/toggle
// This is a protected route.
router.post("/toggle", protect, toggleWishlist);

router.get("/",protect,getUserWishlist)


export default router;
