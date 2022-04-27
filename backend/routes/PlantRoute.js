import express from "express";
import {
  getPlant,
  postDetailPlant,
} from "../controllers/GetPlant.js";

const router = express.Router();

router.get("/", getPlant);
router.post("/DetailPlant", postDetailPlant);

export default router;
