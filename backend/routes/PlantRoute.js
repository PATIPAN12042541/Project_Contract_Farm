import express from "express";
import { getPlant } from "../controllers/GetPlant.js";

const router = express.Router();
router.get('/', getPlant);

export default router;
