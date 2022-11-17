import express from "express";
import {getRole,
        getRoleByAdmin,
        getRoleRegister,
        getTypeUserByID,
        createTypeRole,
        updateTypeUser,
        deleteTypeUser} from "../controllers/RoleGroups.js";

const router = express.Router();

/*--------- Get Data ----------*/
router.get('/', getRole);
router.get('/roleRegister', getRoleRegister);
router.get('/roleAll', getRole);
router.get('/roleByAdmin', getRoleByAdmin);
router.get('/getTypeUserByID/:id',getTypeUserByID);

/*--------- Post Data ----------*/
router.post('/createTypeRole', createTypeRole);

/*--------- Update Data ----------*/
router.patch('/updateTypeUser/:id',updateTypeUser);

/*--------- Delete Data ----------*/
router.delete('/deleteTypeUser/:id', deleteTypeUser);

export default router;