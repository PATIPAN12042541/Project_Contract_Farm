import db from "../config/Database.js";

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
  const { id_plant, name_plant, start_date_plant, end_date_plant } = req.body;
  try {
    await db.query({
      id_plant: id_plant,
      name_plant: name_plant,
      start_date_plant: start_date_plant,
      end_date_plant: end_date_plant,
    });
    res.json({ msg: "Registration Successful" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

