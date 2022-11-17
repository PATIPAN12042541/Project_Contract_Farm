import express from "express";
import {
  Register,
  Login,
  getUsers,
  Logout,
  getUsersByRole,
  getUsersByDev,
  getUsersByAdmin,
  getUsersByID,
  updateUser,
  updatePassword,
  //getCheckId,
} from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

/*--------- Get Data ----------*/
router.get("/check_users", verifyToken, getUsers);
router.get("/token", refreshToken);
router.get("/getUsersByRole", getUsersByRole);
router.get("/getUsersByDev", getUsersByDev);
router.get("/getUsersByAdmin", getUsersByAdmin);
router.get("/getUsers/:id", getUsersByID);
//router.get("/check_same_id", getCheckId);

/*--------- Post Data ----------*/
router.post('/register', Register);
router.post('/login', Login);

/*--------- Update Data ----------*/
router.patch("/updateUsers/:id", updateUser);
router.patch("/updatePassword/:id", updatePassword);


/*--------- Delete Data ----------*/
router.delete('/logout', Logout);

export default router;