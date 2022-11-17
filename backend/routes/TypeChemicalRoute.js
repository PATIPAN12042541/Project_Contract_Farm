import express from "express";
import {
  createTypeChemical,
  getAllTypeChemical,
  getAllTypeChemical2,
  getTypeChemicalByID,
  updateTypeChemical,
  deleteTypeChemical,
} from "../controllers/TypeChemicals.js";

const router = express.Router();

/*--------- Get Data ----------*/
router.get("/getTypeChemical", getAllTypeChemical);
router.get("/getTypeChemical2", getAllTypeChemical2);
router.get("/getTypeChemical/:id", getTypeChemicalByID);

/*--------- Post Data ----------*/
router.post("/addTypeChemical", createTypeChemical);

/*--------- Update Data ----------*/
router.patch("/getTypeChemical/:id", updateTypeChemical);

/*--------- Delete Data ----------*/
router.delete("/getTypeChemical/:id", deleteTypeChemical);

export default router;