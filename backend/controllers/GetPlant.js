import db from "../config/Database.js";
import Plant from "../models/Plant_M.js";
import PlantDetail from "../models/PlantDetail_M.js";
import multer, { diskStorage } from 'multer';
import express from "express";

const app = express();

export const getPlant = async (req, res) => {
  try {
    const plants = await db.query(
      "select * from plant left join plant_detail on plant.id_plant = plant_detail.id",
      {
        type: db.QueryTypes.SELECT,
      }
    );
    res.json(plants);
  } catch (error) {
    res.json({ message: error.message });
  }
};


export const postDetailPlant = async (req, res) => {
  const { id_name_plant, name_plant, start_date_plant, end_date_plant} =
    req.body;

  const storage = diskStorage({
      destination: (req, file, cb) => {
        //../public/dist/img/
        cb(null, '../../public/dist/img/')
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname)
      },
    })

  const upload = multer({ storage: storage });
  let image_name;
  try{
    app.post('/public/dist/img/', upload.single('file'), function (req, res) {
        res.json(console.log('Upload Success'))
          image_name = req.file.filename;
      })
  }catch(error){
      res.json(console.log('Upload Fail'))
  }

  try {
    await PlantDetail.create({
      id_name_plant: id_name_plant,
      quantity_chemical: 0,
      unit: "",
      note: "",
      last_update: Date().toLocaleString(),
    });

    const IdPlant = await db.query(
      "select id,id_name_plant from plant_detail where id_name_plant = :id_name_plant ",
      {
        replacements: { id_name_plant: id_name_plant },
        type: db.QueryTypes.SELECT,
      }
    );

    try {
      await Plant.create({
        id_plant: IdPlant[0].id,
        name_plant: name_plant,
        start_date_plant: start_date_plant,
        end_date_plant: end_date_plant,
        plant_image: "",
      });
    } catch (error) {
      res.json({ message: error.message });
    }

    res.json({ msg: "Registration Successful" });
  } catch (error) {
    res.json({ message: error.message });
  }
};


export const DeletePlant = async (req, res) => {
  try {
    await PlantDetail.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Plant Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};


export const getDataImagePlant = async (req, res) => {
  try {
    const plants = await db.query(
      "SELECT * FROM image_plant_detail where id_plant = :id_plant",
      {
        replacements: { id_plant: req.params.id },
        type: db.QueryTypes.SELECT,
      }
    );
    res.json(plants);
  } catch (error) {
    res.json({ message: error.message });
  }
};