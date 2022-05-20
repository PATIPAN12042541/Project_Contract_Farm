import express from "express";
import {getRole,
        getRoleRegister,
        createTypeRole,
        deleteTypeUser} from "../controllers/RoleGroups.js";

const router = express.Router();
router.get('/', getRole);
router.post('/createTypeRole', createTypeRole);
router.get('/roleRegister', getRoleRegister);
router.delete('/deleteTypeUser/:id', deleteTypeUser);

export default router;