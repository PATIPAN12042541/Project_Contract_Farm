import db from "../config/Database.js";

export const GetZonePlant = async (req, res) => {
  try {
    const zoneplant = await db.query("SELECT * FROM zone_plant", {
      type: db.QueryTypes.SELECT,
    });
    res.json(zoneplant);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getPlant = async (req, res) => {
  try {
    const getPlantDetailEdit = await db.query(
      "SELECT plant_detail.id as id_plant," +
        "id_zone," +
        "id_name_plant," +
        "zone_name," +
        "name_plant," +
        "start_date_plant," +
        "end_date_plant," +
        "plant_image " +
        "FROM zone_plant " +
        "LEFT JOIN  plant_detail ON zone_plant.id =plant_detail.id_zone " +
        "LEFT JOIN  plant ON plant_detail.id =plant.id_plant " +
        "WHERE id_zone = :id_plant",
      {
        replacements: { id_plant: req.params.id },
        type: db.QueryTypes.SELECT,
      }
    );
    res.json(getPlantDetailEdit);
  } catch (eror) {
    res.json({ message: eror.message });
  }
};


