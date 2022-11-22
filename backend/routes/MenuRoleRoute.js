import express from "express";
import {getMenusRoleMain,
       getMenusRoleSubLV1,
       getMenusRoleSubLV1_2,
       createMainMenu
       } from "../controllers/Menus.js";

const router = express.Router();

/************** get data ****************/
router.get('/main/:role_id', getMenusRoleMain);
router.get('/sublv1/:role_id', getMenusRoleSubLV1);
router.get('/main/:role_id/sublv1/:main_menu_id', getMenusRoleSubLV1_2);
/****************************************/

/************** post data ***************/
router.post('/createMainMenu', createMainMenu);
/****************************************/

export default router;