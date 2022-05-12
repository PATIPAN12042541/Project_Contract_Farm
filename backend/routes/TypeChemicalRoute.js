import express from "express";
import {createTypeChemical,
        getAllTypeChemical,
        getTypeChemicalByID} 
        from "../controllers/TypeChemicals.js"

const router = express.Router();

router.post("/addTypeChemical", createTypeChemical);
router.get("/getTypeChemical", getAllTypeChemical);
router.get("/getTypeChemical/:id", getTypeChemicalByID);

export default router;