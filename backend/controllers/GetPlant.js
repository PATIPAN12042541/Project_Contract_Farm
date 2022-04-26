import db from "../config/Database.js";
import Plant from "../models/Plant_M.js";

export const getPlant = async (req, res) => {
  try {
    const plants = await db.query(
      "select * from plant left join plant_detail on plant.id_plant = plant_detail.id_plant",
      {
        type: db.QueryTypes.SELECT,
      }
    );

    res.json(plants);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const postPlant = async (req, res) => {
  const { idplant, nameplant, startdate, enddate } = req.body;
  try {
    await Plant.create({
      id_plant: idplant,
      name_plant: nameplant,
      start_date_plant: startdate,
      end_date_plant: enddate,
    });
    res.json({ msg: "Registration Successful" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

