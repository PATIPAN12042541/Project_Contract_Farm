import db from "../config/Database.js";

export const getCheckTime = async (req, res) => {
  try {
    const checkTime = await db.query(
      "SELECT DISTINCT " +
        "plant.id_plant," +
        "plant.name_plant," +
        "plant.end_date_plant," +
        "zone_plant.zone_name," +
        "plant_detail.id_name_plant " +
        "FROM plant_detail " +
        "LEFT JOIN plant_data_detail ON plant_detail.id = plant_data_detail.id_plant " +
        "LEFT JOIN zone_plant ON plant_detail.id_zone = zone_plant.id " +
        "LEFT JOIN plant ON plant_detail.id = plant.id_plant " +
        "WHERE plant_data_detail.date_end BETWEEN NOW() AND NOW()+INTERVAL 7 DAY ",
      {
        type: db.QueryTypes.SELECT,
      }
    );
    res.json(checkTime);
  } catch (error) {
    res.json({ message: error.message });
  }
};