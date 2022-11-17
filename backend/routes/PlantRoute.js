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
  getPlantMasterSetup,
  getCommentData,
  getCommentDataUpdate,
  UpdatePlantStatus,
  getPlantMasterType,
  postPlantMasterType,
  updatePlantMasterType,
  getPlantMasterTypeUsed,
  // PostPlantStatus,
} from "../controllers/GetPlant.js";

const router = express.Router();

/*--------- Get Data ----------*/
router.get("/:id", getPlant);
router.get("/Data_detail/:id", getDataImagePlant);
router.get("/getDataSelect/:id", getDataSelect);
router.get("/ManagePlantEdit/:id", getManagePlantEdit);
router.get("/Status/StatusPlant", getStatusPlants);
router.get("/plant/getMasterPlant", getPlantMaster);
router.get("/plant/getPlantMasterSetup", getPlantMasterSetup);
router.get("/Comment/:id", getCommentData);
router.get("/plant/getPlantMasterType", getPlantMasterType);
router.get("/plant/getPlantMasterTypeUsed", getPlantMasterTypeUsed);

/*--------- Post Data ----------*/
router.post("/DetailPlant", postDetailPlant);
router.post("/ManagePlant/:id", postManagePlant);
router.post("/plant/postMasterPlant", postPlantMaster);
router.post("/plant/PostPlantMasterType", postPlantMasterType);
// router.post("/status/UpdatePlantStatus", PostPlantStatus);

/*--------- Update Data ----------*/
router.patch("/UpdatePlant/:id", updatePlant);
router.patch("/UpdateManagePlant/:id", UpdateManagePlant);
router.patch("/UpdateStatusPlant/:id", UpdateStatusPlant);
router.patch("/plant/UpdatePlantMaster/:id", UpdatePlantMaster);
router.patch("/Comment/update/:id", getCommentDataUpdate);
router.patch("/update/PlantStatusUpdate/:id", UpdatePlantStatus);
router.patch("/plant/patchPlantMasterType/:id", updatePlantMasterType);

/*--------- Update Data ----------*/
router.delete("/DeletePlant/:id", DeletePlant);
router.delete("/DeleteManagePlant/:id", DeleteManagePlant);
router.delete("/plant/deleteMasterPlant/:id", DeletePlantMaster);
router.delete("/plant/DeleteData/:id", DeletePlantData);


export default router;
