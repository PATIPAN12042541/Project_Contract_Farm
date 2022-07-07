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
import Chemical from "./routes/ChemicalRoute.js";
import Zoneplant from "./routes/ZonePlantRoute.js";
import TypeChemical from "./routes/TypeChemicalRoute.js";
import Header from "./routes/Header.js";
import OverView from "./routes/SystemOverview.js";
import History from "./routes/HistoryPlantRoute.js";

dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log("Database connected...");
} catch (error) {
  console.error("Connection error:", error);
}

//app.use(cors({ credentials:true, origin:'http://localhost:3000' }));

app.use(
  cors({ credentials: true, origin: `${process.env.REACT_APP_API_URL}` })
);

/******** Upload File To Folder public/dist/img/ to frontend **************/
const storage_1 = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public/dist/img/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload_1 = multer({ storage: storage_1 });
try {
  app.post("/public/dist/img", upload_1.single("file"), function (req, res) {
    res.json({});
  });
} catch (error) {
  res.json(console.log("Upload Fail"));
}
/****************************************************************************/

/******** Upload File To Folder public/dist/img/ to frontend **************/
const storage_2 = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public/dist/img/insecticide");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload_2 = multer({ storage: storage_2 });
try {
  app.post(
    "/public/dist/img/insecticide",
    upload_2.single("file"),
    function (req, res) {
      res.json({});
    }
  );
} catch (error) {
  res.json(console.log("Upload 2 Fail"));
}
/****************************************************************************/
/******** Upload File To Folder public/dist/img/ to frontend **************/
const storage_3 = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public/dist/img/Zone");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload_3 = multer({ storage: storage_3 });
try {
  app.post(
    "/public/dist/img/Zone",
    upload_3.single("file"),
    function (req, res) {
      res.json({});
    }
  );
} catch (error) {
  res.json(console.log("Upload 3 Fail"));
}
/****************************************************************************/

app.use(cookieParser());
app.use(express.json());
app.use("/role_group", RoleRoutes);
app.use("/user", UserRoute);
app.use("/getplant", PlantRoute);
app.use("/zoneplant", Zoneplant);
app.use("/menu", MenuRoute);
app.use("/getChemical", Chemical);
app.use("/chemical", TypeChemical);
app.use("/header", Header);
app.use("/header", Header);
app.use("/OverView", OverView);
app.use("/History", History);

app.listen(4000, () => console.log("Server running at port 4000"));