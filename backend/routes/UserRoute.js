import express from "express";
import {Register,Login,getUsers,Logout} from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";


const router = express.Router();

router.get('/', verifyToken, getUsers);
router.get('/token', refreshToken);
router.post('/register', Register);
router.post('/login', Login);
router.delete('/logout', Logout);

export default router;