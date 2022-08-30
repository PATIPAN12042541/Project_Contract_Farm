import express from "express";
import {getRole,
        getRoleByAdmin,
        getRoleRegister,
        getTypeUserByID,
        createTypeRole,
        updateTypeUser,
        deleteTypeUser} from "../controllers/RoleGroups.js";

const router = express.Router();
router.get('/', getRole);
router.post('/createTypeRole', createTypeRole);
router.get('/roleRegister', getRoleRegister);
router.get('/roleAll', getRole);
router.get('/roleByAdmin', getRoleByAdmin);
router.get('/getTypeUserByID/:id',getTypeUserByID)
router.patch('/updateTypeUser/:id',updateTypeUser)
router.delete('/deleteTypeUser/:id', deleteTypeUser);

export default router;