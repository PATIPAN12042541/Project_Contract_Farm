import express from "express";
import dotenv from "dotenv";
import db from "./config/Database.js";
import cookieParser from "cookie-parser";
import RoleRoutes from "./routes/RoleRoutes.js";
import UserRoute from "./routes/UserRoute.js";
import cors from "cors";
import PlantRoute from "./routes/PlantRoute.js";
import MenuRoute from "./routes/MenuRoleRoute.js"
import multer, { diskStorage } from 'multer';

dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log("Database connected...");
} catch (error) {
  console.error("Connection error:", error);
}

//app.use(cors({ credentials:true, origin:'http://localhost:3001' }));

app.use(cors({ credentials:true, origin:'http://node30998-env-3297740.th1.proen.cloud:3000' }));



/******** Upload File To Folder public/dist/img/ to frontend **************/
const storage_1 = diskStorage({
      destination: (req, file, cb) => {
        cb(null, '../public/dist/img/')
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname)
      },
    })

  const upload_1 = multer({ storage: storage_1 });
  try{
    app.post('/public/dist/img', upload_1.single('file'), function (req, res) {
        res.json({})
      })
  }catch(error){
      res.json(console.log('Upload Fail'))
  }
/****************************************************************************/


app.use(cookieParser());
app.use(express.json());
app.use("/role_group", RoleRoutes);
app.use("/user", UserRoute);
app.use("/getplant", PlantRoute);
app.use("/Menu", MenuRoute);
 
app.listen(4000, () => console.log("Server running at port 4000"));