import db from "../config/Database.js";

export const getSystemOverview = async (req, res) => {
  try {
    const Overview = await db.query(
      "SELECT history_contract_farming.id as history_id," +
        "history_contract_farming.zone_id," +
        "CONCAT(history_contract_farming.zone_name,'-',history_contract_farming.plant_id_name) as zone_name," +
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
        "history_contract_farming.disease," +
        "history_contract_farming.bug," +
        "history_contract_farming.weed," +
        "history_contract_farming.remark," +
        "history_contract_farming.qty," +
        "Status_plant.status_name," +
        "history_contract_farming.plant_circle " +
        // "CASE WHEN Status_plant.id = '4' " +
        // "		THEN ( CASE WHEN DATE_FORMAT(history_contract_farming.plant_date_end, '%d-%m-%Y')  < DATE_FORMAT(Status_plant.updatedAt, '%d-%m-%Y') " +
        // "		 					  THEN CONCAT( DATE_FORMAT(history_contract_farming.plant_date_end, '%d-%m-%Y') - DATE_FORMAT(Status_plant.updatedAt, '%d-%m-%Y') ,  ' Day') " +
        // "    						ELSE 'Okay' " +
        // "        		END ) " +
        // "   ELSE '' " +
        // "END AS diff_date ",
        {
          type: db.QueryTypes.SELECT,
        }
    );
    res.json(Overview);
  } catch (error) {
    res.json({ message: error.message });
  }
};
