import db from "../config/Database.js";

export const getCheckTime = async (req, res) => {
  try {
    const checkTime = await db.query(
      // "SELECT DISTINCT " +
      //   "plant.id_plant," +
      //   "plant.name_plant," +
      //   "plant.end_date_plant," +
      //   "zone_plant.zone_name," +
      //   "plant_detail.id_name_plant " +
      //   "FROM plant_detail " +
      //   "LEFT JOIN plant_data_detail ON plant_detail.id = plant_data_detail.id_plant " +
      //   "LEFT JOIN zone_plant ON plant_detail.id_zone = zone_plant.id " +
      //   "LEFT JOIN plant ON plant_detail.id = plant.id_plant " +
      //   "WHERE plant_data_detail.date_end BETWEEN NOW()- INTERVAL 1 day  AND  NOW()+INTERVAL 7 DAY " +
      //   "AND plant_data_detail.status_check != 0 " +
      //   "union " +
      //   "SELECT DISTINCT " +
      //   "plant.id_plant," +
      //   "plant.name_plant," +
      //   "plant.end_date_plant," +
      //   "zone_plant.zone_name," +
      //   "plant_detail.id_name_plant " +
      //   "FROM plant_detail " +
      //   "LEFT JOIN plant_data_detail ON plant_detail.id = plant_data_detail.id_plant " +
      //   "LEFT JOIN zone_plant ON plant_detail.id_zone = zone_plant.id " +
      //   "LEFT JOIN plant ON plant_detail.id = plant.id_plant " +
      //   "WHERE plant_data_detail.date_end < NOW() " +
      //   "AND plant_data_detail.status_check != 0 ",
      "SELECT DISTINCT " +
        "plant.id_plant, " +
        "plant_master_detail.plant_name as name_plant, " +
        "plant.end_date_plant, " +
        "zone_plant.zone_name, " +
        "plant_detail.id_name_plant " +
        "FROM plant_detail " +
        "LEFT JOIN plant_data_detail ON plant_detail.id = plant_data_detail.id_plant " +
        "LEFT JOIN zone_plant ON plant_detail.id_zone = zone_plant.id " +
        "LEFT JOIN plant ON plant_detail.id = plant.id_plant " +
        "LEFT JOIN plant_master_detail ON plant.name_plant = plant_master_detail.id " +
        "WHERE plant_data_detail.date_end BETWEEN NOW()- INTERVAL 1 day  AND  NOW()+INTERVAL 7 DAY " +
        "AND plant_data_detail.status_check != 0 " +
        "union " +
        "SELECT DISTINCT " +
        "plant.id_plant," +
        "plant_master_detail.plant_name as name_plant, " +
        "plant.end_date_plant, " +
        "zone_plant.zone_name, " +
        "plant_detail.id_name_plant " +
        "FROM plant_detail " +
        "LEFT JOIN plant_data_detail ON plant_detail.id = plant_data_detail.id_plant " +
        "LEFT JOIN zone_plant ON plant_detail.id_zone = zone_plant.id " +
        "LEFT JOIN plant ON plant_detail.id = plant.id_plant " +
        "LEFT JOIN plant_master_detail ON plant.name_plant = plant_master_detail.id " +
        "WHERE plant_data_detail.date_end < NOW() " +
        "AND plant_data_detail.status_check != 0 ",
      {
        type: db.QueryTypes.SELECT,
      }
    );
    res.json(checkTime);
  } catch (error) {
    res.json({ message: error.message });
  }
};
