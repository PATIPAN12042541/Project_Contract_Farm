import express from "express";
import {createTypeChemical,
        getAllTypeChemical,
        getTypeChemicalByID,
        updateTypeChemical,
        deleteTypeChemical} 
        from "../controllers/TypeChemicals.js"

const router = express.Router();

router.post("/addTypeChemical", createTypeChemical);
router.get("/getTypeChemical", getAllTypeChemical);
router.get("/getTypeChemical/:id", getTypeChemicalByID);
router.patch("/getTypeChemical/:id", updateTypeChemical);
router.delete("/getTypeChemical/:id", deleteTypeChemical);

export default router;