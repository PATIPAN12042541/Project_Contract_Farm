import db from "../config/Database.js";
import HistoryPlant from "../models/HistoryPlantModel.js";


export const getHistoryPlant = async (req, res) => {
  const {
    zone_id,
    zone_name,
    zone_image,
    plant_id,
    plant_id_name,
    plant_name,
    user_id,
    plant_date_start,
    plant_date_end,
    plant_img,
    plant_status,
    plant_circle,
  } = req.body;

  try {
    await HistoryPlant.create({
      zone_id: zone_id,
      zone_name: zone_name,
      zone_image: zone_image,
      plant_id: plant_id,
      plant_id_name: plant_id_name,
      plant_name: plant_name,
      user_id: user_id,
      plant_date_start: plant_date_start,
      plant_date_end: plant_date_end,
      plant_img: plant_img,
      chemical_id: "",
      residual_period_id: "",
      chemical_cc: "",
      chemical_liter: "",
      chemical_note: "",
      chemical_date_start: "",
      chemical_date_end: "",
      plant_status: plant_status,
      plant_circle: plant_circle,
    });
  } catch (error) {
    res.json({ message: error.message });
  }

  res.json({ msg: "Successful" });
};
