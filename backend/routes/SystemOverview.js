import express from "express";
import { getSystemOverview } from "../controllers/GetSystemOverview.js";

const router = express.Router();

router.get("/", getSystemOverview);

export default router;
