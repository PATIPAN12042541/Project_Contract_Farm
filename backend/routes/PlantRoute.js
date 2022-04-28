import express from "express";
import {
  getPlant,
  postDetailPlant,
  DeletePlant,
  getDataImagePlant,
} from "../controllers/GetPlant.js";

const router = express.Router();

router.get("/", getPlant);
router.get("/Data_detail", getDataImagePlant);
router.post("/DetailPlant/:id", postDetailPlant);
router.delete("/DeletePlant/:id", DeletePlant);


export default router;
