import express from "express";
import {Register,Login,getUsers} from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";


const router = express.Router();

router.get('/check_users', verifyToken, getUsers);
router.get('/token', refreshToken);
router.post('/register', Register);
router.post('/login', Login);

export default router;