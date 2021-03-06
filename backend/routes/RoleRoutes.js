import express from "express";
import {getRole,
        getRoleRegister,
        getTypeUserByID,
        createTypeRole,
        updateTypeUser,
        deleteTypeUser} from "../controllers/RoleGroups.js";

const router = express.Router();
router.get('/', getRole);
router.post('/createTypeRole', createTypeRole);
router.get('/roleRegister', getRoleRegister);
router.get('/getTypeUserByID/:id',getTypeUserByID)
router.patch('/updateTypeUser/:id',updateTypeUser)
router.delete('/deleteTypeUser/:id', deleteTypeUser);

export default router;