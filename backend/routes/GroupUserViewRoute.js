import express from "express";
import {
  getUsersByDev
} from "../controllers/GroupUserView";


const router = express.Router();

router.get("/getUsersByDev",getUsersByDev);

export default router;