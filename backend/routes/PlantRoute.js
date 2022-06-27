import express from "express";
import {
  getPlant,
  postDetailPlant,
  DeletePlant,
  getDataImagePlant,
  updatePlant,
  postManagePlant,
  getManagePlantEdit,
  DeleteManagePlant,
  UpdateManagePlant,
  getStatusPlants,
  UpdateStatusPlant,
  getPlantMaster,
  postPlantMaster,
} from "../controllers/GetPlant.js";

const router = express.Router();

router.get("/:id", getPlant);
router.get("/Data_detail/:id", getDataImagePlant);
router.post("/DetailPlant", postDetailPlant);
router.patch("/UpdatePlant/:id", updatePlant);
router.delete("/DeletePlant/:id", DeletePlant);
router.post("/ManagePlant/:id", postManagePlant);
router.get("/ManagePlantEdit/:id", getManagePlantEdit);
router.delete("/DeleteManagePlant/:id", DeleteManagePlant);
router.patch("/UpdateManagePlant/:id", UpdateManagePlant);
router.get("/Status/StatusPlant", getStatusPlants);
router.patch("/UpdateStatusPlant/:id", UpdateStatusPlant);
router.get("/plant/getMasterPlant", getPlantMaster);
router.post("/plant/postMasterPlant", postPlantMaster);

export default router;
