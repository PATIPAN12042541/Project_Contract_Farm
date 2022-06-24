import db from "../config/Database.js";
import HistoryPlant from "../models/HistoryPlantModel.js";


export const getDataPlant = async (req, res) => {
  try {
    const getDataPlant = await db.query(
      "SELECT zone_plant.id AS zone_id," +
        "        zone_plant.zone_name," +
        "        zone_plant.image_zone," +
        "        plant_detail.id_name_plant	as plant_id_name," +
        "        plant.id as plant_id,"+
        "        plant.id_user," +
        "        plant.name_plant," +
        "        plant.start_date_plant," +
        "        plant.end_date_plant," +
        "        plant.plant_image," +
        "        plant.status_plant," +
        "        plant.status_circle " +
        "FROM plant " +
        "LEFT JOIN plant_detail ON plant.id_plant = plant_detail.id " +
        "LEFT JOIN zone_plant ON plant_detail.id_zone = zone_plant.id " +
        "where plant.id = :id_plant ",
      {
        replacements: { id_plant: req.params.id },
        type: db.QueryTypes.SELECT,
      }
    );

    res.json(getDataPlant);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const PostHistoryPlant = async (req, res) => {
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
      chemical_id: "1",
      residual_period_id: "1",
      chemical_cc: "1",
      chemical_liter: "1",
      chemical_note: "-",
      chemical_date_start: "2022-06-17",
      chemical_date_end: "2022-06-17",
      plant_status: plant_status,
      plant_circle: plant_circle,
    });
  } catch (error) {
    res.json({ message: error.message });
  }

  res.json({ msg: "Successful" });
};



