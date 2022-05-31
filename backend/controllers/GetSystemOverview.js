import db from "../config/Database.js";

export const getSystemOverview = async (req, res) => {
  try {
    const Overview = await db.query(
      "SELECT " +
        "CASE " +
        "   WHEN plant_detail.id_name_plant IS NULL THEN zone_plant.zone_name " +
        "   ELSE CONCAT(zone_plant.zone_name,'-',plant_detail.id_name_plant) " +
        "END AS zone_id, " +
        "plant.name_plant," +
        "plant.start_date_plant," +
        "plant.end_date_plant," +
        "CONCAT(user.name,' ',user.last_name) AS name," +
        "CONCAT(name_chemical.name_chemical,' (',name_chemical.name_chemical_eng,')') AS name_chemical," +
        "CONCAT(residual_period_chemical.time, ' ',residual_period_chemical.unit) AS days, " +
        "CONCAT(plant_data_detail.cc, ' : ',plant_data_detail.liter) AS quantity, " +
        "plant_data_detail.note," +
        "plant_data_detail.date_start," +
        "plant_data_detail.date_end," +
        "CASE " +
        "   WHEN plant_data_detail.status_check = 0 THEN 'Success' " +
        "   WHEN plant_data_detail.status_check IS NULL THEN 'Not Found' " +
        "   ELSE 'Not Success' " +
        "END AS status_check " +
        "FROM zone_plant " +
        "LEFT JOIN plant_detail ON zone_plant.id = plant_detail.id_zone " +
        "LEFT JOIN plant ON plant_detail.id = plant.id_plant " +
        "LEFT JOIN user ON plant.id_user = user.id " +
        "LEFT JOIN plant_data_detail ON plant_detail.id = plant_data_detail.id_plant " +
        "LEFT JOIN name_chemical ON plant_data_detail.id_name_chemical = name_chemical.id " +
        "LEFT JOIN residual_period_chemical ON plant_data_detail.id_residual_period = residual_period_chemical.id ",
      {
        replacements: { zone_plant_id: req.params.id },
        type: db.QueryTypes.SELECT,
      }
    );
    res.json(Overview);
  } catch (error) {
    res.json({ message: error.message });
  }
};
