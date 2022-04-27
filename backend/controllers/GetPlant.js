import db from "../config/Database.js";
import Plant from "../models/Plant_M.js";
import PlantDetail from "../models/PlantDetail_M.js";

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

export const postPlant = async (req, res) => {
  const { id_name_plant, name_plant, start_date_plant, end_date_plant } =
    req.body;
  try {
    await PlantDetail.create({
      id_name_plant: id_name_plant,
      quantity_chemical: 0,
      unit: "",
      note: "",
      last_update: Date().toLocaleString(),
    });

    const IdPlant = await db.query(
      "select id from plant_detail where id_name_plant = :id_name_plant ",
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
      res.json({ msg: "Registration Successful" });
    } catch (error) {
      res.json({ message: error.message + jsonID });
    }

    res.json({ msg: "Registration Successful" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

