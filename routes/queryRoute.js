import express from "express";
import { createNewQuery } from "../controller/queryController.js";

const router = express.Router();

// POST /api/query
router.post("/", createNewQuery);

export default router;
