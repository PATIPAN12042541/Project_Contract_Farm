import express from "express";
import {Register} from "../controllers/Users.js";

const router = express.Router();

router.post('/user', Register);

export default router;