import express from "express";
import { getPlant } from "../controllers/Plant_C.js";

const router = express.Router();
router.get("/", getPlant);

export default router;
