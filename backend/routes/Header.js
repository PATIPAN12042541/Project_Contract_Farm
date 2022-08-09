import express from "express";
import { getCheckTime, getCheckTimeUser } from "../controllers/GetHeader.js";

const router = express.Router();

router.get("/", getCheckTime);
router.get("/user/:id", getCheckTimeUser);

export default router;
