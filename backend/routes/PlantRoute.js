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
  DeletePlantMaster,
  UpdatePlantMaster,
  DeletePlantData,
  getDataSelect,
} from "../controllers/GetPlant.js";

const router = express.Router();

router.get("/:id", getPlant);
router.get("/Data_detail/:id", getDataImagePlant);
router.get("/getDataSelect/:id", getDataSelect);
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
router.delete("/plant/deleteMasterPlant/:id", DeletePlantMaster);
router.patch("/plant/UpdatePlantMaster/:id", UpdatePlantMaster);
router.delete("/plant/DeleteData/:id", DeletePlantData);

export default router;
