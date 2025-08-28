// src/routes/index.js
import express from "express";
import userRoute from "./userRoute.js";
import productRoute from "./productRoute.js";
import dashboardRoute from "./dashboardRoute.js"
import leadRoutes from "./leadRoute.js"
import wishlistRoutes from "./wishlistRoute.js"
import queryRoutes from "./queryRoute.js"

const router = express.Router();

router.use("/users", userRoute);
router.use("/products", productRoute);
router.use("/dashboard", dashboardRoute);
router.use("/leads", leadRoutes);

router.use("/wishlist", wishlistRoutes);
router.use('/query', queryRoutes); // Add this line




export default router;
