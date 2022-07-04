import db from "../config/Database.js";

export const getSystemOverview = async (req, res) => {
  try {
    const Overview = await db.query(
      // "SELECT " +
      //   "CASE " +
      //   "   WHEN plant_detail.id_name_plant IS NULL THEN zone_plant.zone_name " +
      //   "   ELSE CONCAT(zone_plant.zone_name,'-',plant_detail.id_name_plant) " +
      //   "END AS zone_id, " +
      //   "plant.name_plant," +
      //   "plant.start_date_plant," +
      //   "plant.end_date_plant," +
      //   "CONCAT(user.name,' ',user.last_name) AS name," +
      //   "CONCAT(name_chemical.name_chemical,' (',name_chemical.name_chemical_eng,')') AS name_chemical," +
      //   "CONCAT(residual_period_chemical.time, ' ',residual_period_chemical.unit) AS days, " +
      //   "CONCAT(plant_data_detail.cc, ' : ',plant_data_detail.liter) AS quantity, " +
      //   "plant_data_detail.note," +
      //   "plant_data_detail.date_start," +
      //   "plant_data_detail.date_end," +
      //   "CASE " +
      //   "   WHEN plant_data_detail.status_check = 0 THEN 'Success' " +
      //   "   WHEN plant_data_detail.status_check IS NULL THEN 'Not Found' " +
      //   "   ELSE 'Not Success' " +
      //   "END AS status_check " +
      //   "FROM zone_plant " +
      //   "LEFT JOIN plant_detail ON zone_plant.id = plant_detail.id_zone " +
      //   "LEFT JOIN plant ON plant_detail.id = plant.id_plant " +
      //   "LEFT JOIN user ON plant.id_user = user.id " +
      //   "LEFT JOIN plant_data_detail ON plant_detail.id = plant_data_detail.id_plant " +
      //   "LEFT JOIN name_chemical ON plant_data_detail.id_name_chemical = name_chemical.id " +
      //   "LEFT JOIN residual_period_chemical ON plant_data_detail.id_residual_period = residual_period_chemical.id ",

      "SELECT history_contract_farming.id as history_id," +
        "history_contract_farming.zone_id," +
        "history_contract_farming.zone_name," +
        "plant_master_detail.plant_name," +
        "CONCAT(user.name,' ',user.last_name) as username," +
        "history_contract_farming.plant_date_start as start_plant," +
        "history_contract_farming.plant_date_end as end_plant," +
        "name_chemical.name_chemical," +
        "name_chemical.name_chemical_eng," +
        "name_chemical.eu_mrl," +
        "residual_period_chemical.time," +
        "residual_period_chemical.unit," +
        "history_contract_farming.chemical_cc," +
        "history_contract_farming.chemical_liter," +
        "history_contract_farming.chemical_note," +
        "history_contract_farming.chemical_date_start," +
        "history_contract_farming.chemical_date_end," +
        "Status_plant.status_name," +
        "history_contract_farming.plant_circle " +
        "FROM history_contract_farming " +
        "LEFT JOIN plant_master_detail ON history_contract_farming.plant_name = plant_master_detail.id " +
        "LEFT JOIN user ON history_contract_farming.user_id = user.id " +
        "LEFT JOIN name_chemical ON history_contract_farming.chemical_id = name_chemical.id " +
        "LEFT JOIN residual_period_chemical ON history_contract_farming.residual_period_id = residual_period_chemical.id " +
        "LEFT JOIN Status_plant ON history_contract_farming.plant_status = Status_plant.id ",
      {
        // replacements: { zone_plant_id: req.params.id },
        type: db.QueryTypes.SELECT,
      }
    );
    res.json(Overview);
  } catch (error) {
    res.json({ message: error.message });
  }
};
