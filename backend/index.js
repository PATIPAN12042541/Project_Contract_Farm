import express from "express";
import dotenv from "dotenv";
import db from "./config/Database.js";
import cookieParser from "cookie-parser";
import RoleRoutes from "./routes/RoleRoutes.js";
import UserRoute from "./routes/UserRoute.js";
import cors from "cors";
import PlantRoute from "./routes/PlantRoute.js";
import multer, { diskStorage } from 'multer'

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

/*const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../public/dist/img/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage: storage })
try{
    app.post('../public/dist/img/', upload.single('file'), function (req, res) {
        res.json({msg:"Upload OK"})
      })
}catch(error){
    res.json({msg:"Upload Fail"})
}*/

app.post('public/dist/img/', (req, res) => {
  if (req.files === null) {
  return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/public/dist/img/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `public/dist/img/${file.name}` });
  });
});

app.use(cookieParser());
app.use(express.json());
app.use("/role_group", RoleRoutes);
app.use("/user", UserRoute);
app.use("/getplant", PlantRoute);
 
app.listen(4000, () => console.log("Server running at port 4000"));