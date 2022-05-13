import db from "../config/Database.js";
import ZonePlant from "../models/ZonePlant.js";

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

export const getDataPlant = async (req, res) => {
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
        "LEFT JOIN  plant ON plant_detail.id = plant.id_plant " +
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

export const postZone = async (req, res) => {
  const { zone_name, image_zone, auto_id_zone } = req.body;

  try {
    await ZonePlant.create({
      zone_name: zone_name,
      image_zone: "../dist/img/" + image_zone,
      auto_id_zone: auto_id_zone,
    });
  } catch (error) {
    res.json({ message: error.message });
  }

  res.json({ msg: "Successful" });
};
  

export const DeleteZone = async (req, res) => {
  try {
    await ZonePlant.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Deleted Successful",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};


export const UpdateZone = async (req, res) => {
  try {
    await ZonePlant.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.json({
      message: "Updated Saccess",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};