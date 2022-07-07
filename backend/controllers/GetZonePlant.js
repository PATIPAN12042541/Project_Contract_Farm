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
      "SELECT plant_detail.id as id_plants," +
        "id_zone," +
        "id_name_plant," +
        "zone_name," +
        "plant_master_detail.plant_name as name_plant," +
        "start_date_plant," +
        "end_date_plant," +
        "plant_master_detail.plant_img as plant_image," +
        "user.name," +
        "plant.status_plant," +
        "Status_plant.status_name," +
        "user.last_name ," +
        "(SELECT sum(plant_data_detail.status_check) from plant_data_detail LEFT JOIN plant_detail ON plant_data_detail.id_plant  = plant_detail.id where plant_detail.id = id_plants) AS status_chemical," +
        "(SELECT sum(plant_data_detail_fertilizer.status_check) from plant_data_detail_fertilizer LEFT JOIN plant_detail ON plant_data_detail_fertilizer.id_plant  = plant_detail.id where plant_detail.id = id_plants) AS status_Fertilizer, " +
        "plant_harvest_status.plant_status," +
        "plant_harvest_status.harvest_status " +
        "FROM zone_plant " +
        "LEFT JOIN  plant_detail ON zone_plant.id =plant_detail.id_zone " +
        "LEFT JOIN  plant ON plant_detail.id = plant.id_plant " +
        "LEFT JOIN user ON  plant.id_user =  user.id " +
        "LEFT JOIN Status_plant ON plant.status_plant = Status_plant.id " +
        "LEFT JOIN plant_master_detail ON plant.name_plant = plant_master_detail.id " +
        "LEFT JOIN plant_harvest_status ON plant_detail.id = plant_harvest_status.plant_id_data " +
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

export const getPlantDetail = async (req, res) => {
  try {
    const Plant_Detail = await db.query(
      "SELECT plant_detail.id as id_plants," +
        "        id_zone," +
        "        id_name_plant," +
        "        zone_name," +
        "        plant_master_detail.plant_name as name_plant," +
        "        start_date_plant," +
        "        end_date_plant," +
        "        plant_master_detail.plant_img as plant_image," +
        "        user.name," +
        "        plant.status_plant," +
        "        user.last_name ," +
        "        (SELECT sum(plant_data_detail.status_check) from plant_data_detail LEFT JOIN plant_detail ON plant_data_detail.id_plant  = plant_detail.id where plant_detail.id = id_plants) AS status_check, " +
        "        plant_harvest_status.plant_status," +
        "        plant_harvest_status.harvest_status " +
        "FROM zone_plant " +
        "LEFT JOIN  plant_detail ON zone_plant.id =plant_detail.id_zone " +
        "LEFT JOIN  plant ON plant_detail.id = plant.id_plant " +
        "LEFT JOIN user ON  plant.id_user =  user.id " +
        "LEFT JOIN plant_master_detail ON plant.name_plant = plant_master_detail.id " +
        "LEFT JOIN plant_harvest_status ON plant_detail.id = plant_harvest_status.plant_id_data " +
        "WHERE plant_detail.id = :id",
      {
        replacements: { id: req.params.id },
        type: db.QueryTypes.SELECT,
      }
    );
    res.json(Plant_Detail);
  } catch (eror) {
    res.json({ message: eror.message });
  }
};


export const postZone = async (req, res) => {
  const { zone_name, image_zone, auto_id_zone, lat, lon } = req.body;

  try {
    await ZonePlant.create({
      zone_name: zone_name,
      image_zone: "../dist/img/Zone/" + image_zone,
      auto_id_zone: auto_id_zone,
      lat: lat,
      lon: lon,
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