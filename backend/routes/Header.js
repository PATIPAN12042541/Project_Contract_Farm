import express from "express";
import { getCheckTime } from "../controllers/GetHeader.js";

const router = express.Router();
router.get("/", getCheckTime);

export default router;
