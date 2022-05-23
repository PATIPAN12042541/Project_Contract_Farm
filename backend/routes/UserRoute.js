import express from "express";
import {Register,Login,getUsers,Logout,getUsers,} from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";


const router = express.Router();

router.get('/check_users', verifyToken, getUsers);
router.get('/token', refreshToken);
router.get('/getUsers', getUsers);
router.post('/register', Register);
router.post('/login', Login);
router.delete('/logout', Logout);

export default router;