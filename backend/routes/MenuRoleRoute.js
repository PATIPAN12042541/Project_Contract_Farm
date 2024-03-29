import express from "express";
import {getMenusRoleMain,
       getShowMenusRoleMain,
       getMenusRoleSubLV1,
       getMenusRoleSubLV1_2,
       createMainMenu,
       updateMainMenu,
       createSubMenu,
       updateSubMenu
       } from "../controllers/Menus.js";

const router = express.Router();

/************** get data ****************/
router.get('/main/:role_id', getMenusRoleMain);
router.get('/sublv1/:role_id', getMenusRoleSubLV1);

router.get('/main/show/:role_id', getShowMenusRoleMain);
router.get('/main/:role_id/sublv1/:main_menu_id', getMenusRoleSubLV1_2);
/****************************************/

/************** post data ***************/
router.post('/createMainMenu', createMainMenu);
router.post('/createSubMenu', createSubMenu);
/****************************************/

/************** update data ***************/
router.patch('/updateMainMenu/:id',updateMainMenu);
router.patch('/updateSubMenu/:id',updateSubMenu);
/****************************************/

export default router;