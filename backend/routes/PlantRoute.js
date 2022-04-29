import express from "express";
import {
  getPlant,
  postDetailPlant,
  DeletePlant,
  getDataImagePlant,
  updatePlant,
} from "../controllers/GetPlant.js";

const router = express.Router();

router.get("/", getPlant);
router.get("/Data_detail/:id", getDataImagePlant);
router.post("/DetailPlant", postDetailPlant);
router.patch("/UpdatePlant/:id",updatePlant);
router.delete("/DeletePlant/:id", DeletePlant);


export default router;
