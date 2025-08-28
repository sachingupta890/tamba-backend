import express from "express";
import {
  addProduct,
  deleteProductDetails,
  getProductDetails,
  getProducts,
  getPublicProducts,
  updateProductDetails,
} from "../controller/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import upload from "../config/cloudinary.js";

const router = express.Router();

router.get("/public", getPublicProducts);

// POST /api/products (No change here)
router.post("/", protect, admin, upload.array("images", 5), addProduct);

router.get("/", protect, admin, getProducts);
router.get("/public/:id", getProductDetails);
router.get("/:id", protect, admin, getProductDetails);

// --- THIS IS THE FIX ---
// PUT /api/products/:id
router.put(
  "/:id",
  protect,
  admin,
  // Use upload.fields to accept files from 'newImages' and text from 'images'
  upload.fields([{ name: "newImages", maxCount: 5 }]),
  updateProductDetails
);

router.delete("/:id", protect, admin, deleteProductDetails);

export default router;
