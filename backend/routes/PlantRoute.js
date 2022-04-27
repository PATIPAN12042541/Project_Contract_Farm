import express from "express";
import {
  getPlant,
  postPlant,
  postDetailPlant,
} from "../controllers/GetPlant.js";

const router = express.Router();

router.get("/", getPlant);
router.post("/Plant", postPlant);
router.post("/DetailPlant", postDetailPlant);

export default router;
