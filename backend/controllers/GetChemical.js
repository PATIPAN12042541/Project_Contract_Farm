import db from "../config/Database.js";
import NameChemical from "../models/ChemicalModel.js";
import PlantDataDetail_M from "../models/PlantDataDetails_M.js";
import Fertilizer from "../models/FertilizerModel.js";
import FertilizerUnit_M from "../models/FertilizerUnit_M.js";
import ResidualPeriodChemical_M from "../models/ResidualPeriodChemical_M.js";
import ReportDefectChemical_M from "../models/ReportDefectChemical_M.js";

export const getChemical = async (req, res) => {
  try {
    const chemical = await db.query(
      "SELECT name_chemical.id," +
        "name_chemical.name_chemical," +
        "name_chemical.name_chemical_eng," +
        "name_chemical.eu_mrl," +
        "name_chemical.path_img," +
        "name_chemical.type_chemical_id," +
        "type_chemical.type_chemical," +
        "name_chemical.status " +
        "FROM name_chemical " +
        "LEFT JOIN type_chemical " +
        "on name_chemical.type_chemical_id = type_chemical.id " +
        "Where name_chemical.status = 1 AND name_chemical.type_chemical_id = 4 ",
      {
        type: db.QueryTypes.SELECT,
      }
    );
    res.json(chemical);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getFertilizer = async (req, res) => {
  try {
    const fertilizer = await db.query(
      "SELECT name_chemical.id," +
        "name_chemical.name_chemical," +
        "name_chemical.name_chemical_eng," +
        "name_chemical.eu_mrl," +
        "name_chemical.path_img " +
        "FROM name_chemical " +
        "LEFT JOIN type_chemical " +
        "on name_chemical.type_chemical_id = type_chemical.id " +
        "Where name_chemical.status = 1 AND name_chemical.type_chemical_id = 5 ",
      {
        type: db.QueryTypes.SELECT,
      }
    );
    res.json(fertilizer);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getFertilizerSelect = async (req, res) => {
  try {
    const fertilizerSelect = await db.query(
      "SELECT name_chemical.id," +
        "name_chemical.name_chemical," +
        "name_chemical.name_chemical_eng," +
        "name_chemical.eu_mrl," +
        "name_chemical.path_img " +
        "FROM name_chemical " +
        "LEFT JOIN type_chemical " +
        "on name_chemical.type_chemical_id = type_chemical.id " +
        "Where name_chemical.status = 1 AND name_chemical.type_chemical_id = 5 AND name_chemical.id = :id ",
      {
        replacements: { id: req.params.id },
        type: db.QueryTypes.SELECT,
      }
    );
    res.json(fertilizerSelect);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getFertilizerUnit = async (req, res) => {
  try {
    const fertilizerUnit = await db.query(
      "SELECT id,unit	 FROM fertilizer_unit ",
      {
        type: db.QueryTypes.SELECT,
      }
    );
    res.json(fertilizerUnit);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getFertilizerData = async (req, res) => {
  try {
    const data = await db.query(
      "SELECT plant_data_detail_fertilizer.id," +
        "plant_data_detail_fertilizer.id_plant," +
        "plant_data_detail_fertilizer.id_name_chemical," +
        "name_chemical.name_chemical," +
        "name_chemical.name_chemical_eng," +
        "plant_data_detail_fertilizer.quantity," +
        "fertilizer_unit.id as unit_id," +
        "fertilizer_unit.unit," +
        "plant_data_detail_fertilizer.date_start," +
        "plant_data_detail_fertilizer.date_end," +
        "name_chemical.path_img," +
        "plant_data_detail_fertilizer.note as note," +
        "plant_data_detail_fertilizer.status_check " +
        "FROM plant_data_detail_fertilizer " +
        "LEFT JOIN name_chemical on plant_data_detail_fertilizer.id_name_chemical = name_chemical.id " +
        "LEFT JOIN fertilizer_unit on plant_data_detail_fertilizer.unit = fertilizer_unit.id " +
        "where id_plant = :id ",
      {
        replacements: { id: req.params.id },
        type: db.QueryTypes.SELECT,
      }
    );
    res.json(data);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteFertilizer = async (req, res) => {
  try {
    await Fertilizer.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Chemical Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getChemicalMaster = async (req, res) => {
  try {
    const chemical = await db.query(
      "SELECT name_chemical.id," +
        "name_chemical.name_chemical," +
        "name_chemical.name_chemical_eng," +
        "name_chemical.eu_mrl," +
        "name_chemical.path_img," +
        "name_chemical.type_chemical_id," +
        "type_chemical.type_chemical," +
        "name_chemical.status " +
        "FROM name_chemical " +
        "LEFT JOIN type_chemical " +
        "on name_chemical.type_chemical_id = type_chemical.id",
      {
        type: db.QueryTypes.SELECT,
      }
    );
    res.json(chemical);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getChemicalMaster2 = async (req, res) => {
  try {
    const chemical = await db.query(
      "SELECT name_chemical.id," +
        "name_chemical.name_chemical," +
        "name_chemical.name_chemical_eng," +
        "name_chemical.eu_mrl," +
        "name_chemical.path_img," +
        "name_chemical.type_chemical_id," +
        "type_chemical.type_chemical," +
        "name_chemical.status " +
        "FROM name_chemical " +
        "LEFT JOIN type_chemical " +
        "on name_chemical.type_chemical_id = type_chemical.id " +
        "where name_chemical.status = '1'",
      {
        type: db.QueryTypes.SELECT,
      }
    );
    res.json(chemical);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getExpired = async (req, res) => {
  try {
    const expired = await db.query("SELECT * FROM residual_period_chemical", {
      type: db.QueryTypes.SELECT,
    });
    res.json(expired);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getChemicalByID = async (req, res) => {
  try {
    const nameChemicals = await NameChemical.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(nameChemicals[0]);
  } catch (error) {
    res.json(error);
  }
};

export const getSelect = async (req, res) => {
  try {
    const Select = await db.query(
      "SELECT id,name_chemical,name_chemical_eng,eu_mrl,path_img FROM name_chemical where  id = :id  ",
      {
        replacements: { id: req.params.id },
        type: db.QueryTypes.SELECT,
      }
    );
    res.json(Select);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const postFertilizer = async (req, res) => {
  const { id_name_chemical, quantity, unit, date_start, date_end, note } =
    req.body;
  try {
    await Fertilizer.create({
      id_plant: req.params.id,
      id_name_chemical: id_name_chemical,
      quantity: quantity,
      unit: unit,
      note: note,
      date_start: date_start,
      date_end: date_end,
      status_check: 1,
    });
    res.json({ msg: "Create Successful" });
  } catch (error) {
    //console.log(error);
    res.json(error);
  }
};

export const createChemical = async (req, res) => {
  const {
    name_chemical,
    name_chemical_eng,
    eu_mrl,
    path_img,
    type_chemical_id,
    status,
  } = req.body;
  try {
    await NameChemical.create({
      name_chemical: name_chemical,
      name_chemical_eng: name_chemical_eng,
      eu_mrl: eu_mrl,
      path_img: path_img,
      type_chemical_id: type_chemical_id,
      status: status,
    });
    res.json({ msg: "Create Successful" });
  } catch (error) {
    //console.log(error);
    res.json(error);
  }
};

export const UpdateChangeStatus = async (req, res) => {
  try {
    await PlantDataDetail_M.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Chemical Updated",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateChemical = async (req, res) => {
  try {
    await NameChemical.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Chemical Updated",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteChemical2 = async (req, res) => {
  try {
    await NameChemical.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Chemical Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const ManageChemical = async (req, res) => {
  const {
    id_name_chemical,
    id_residual_period,
    cc,
    liter,
    note,
    date_start,
    date_end,
  } = req.body;
  try {
    await PlantDataDetail_M.create({
      id_plant: req.params.id,
      id_name_chemical: id_name_chemical,
      id_residual_period: id_residual_period,
      cc: cc,
      liter: liter,
      note: note,
      date_start: date_start,
      date_end: date_end,
    });
    res.json({ msg: "Create Successful" });
  } catch (error) {
    //console.log(error);
    res.json(error);
  }
};

export const DeleteChemical = async (req, res) => {
  try {
    await PlantDataDetail_M.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Chemical Detail Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateFertilizerData = async (req, res) => {
  try {
    await Fertilizer.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "FertilizerData Updated",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const FertilizerDataDetail = async (req, res) => {
  try {
    const Select = await db.query(
      "SELECT plant_data_detail_fertilizer.id as id," +
        "plant_data_detail_fertilizer.id_plant as id_plant," +
        "name_chemical.id as id_chemical," +
        "name_chemical.name_chemical as name_thai," +
        "name_chemical.name_chemical_eng as name_eng," +
        "name_chemical.eu_mrl as eu_mrl," +
        "name_chemical.path_img as path_img," +
        "plant_data_detail_fertilizer.quantity as quantity," +
        "fertilizer_unit.id as  id_unit," +
        "fertilizer_unit.unit as unit," +
        "plant_data_detail_fertilizer.note as note," +
        "plant_data_detail_fertilizer.date_start as date_start," +
        "plant_data_detail_fertilizer.date_end as date_end, " +
        "plant_data_detail_fertilizer.status_check as status_check " +
        "FROM plant_data_detail_fertilizer " +
        "LEFT JOIN fertilizer_unit ON plant_data_detail_fertilizer.unit = fertilizer_unit.id " +
        "LEFT JOIN name_chemical ON plant_data_detail_fertilizer.id_name_chemical = name_chemical.id " +
        "where plant_data_detail_fertilizer.id_plant = :id_plant " +
        "AND name_chemical.status = 1 " +
        "AND name_chemical.type_chemical_id = 5 ",
      {
        replacements: { id_plant: req.params.id },
        type: db.QueryTypes.SELECT,
      }
    );
    res.json(Select);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateFertilizerStauts = async (req, res) => {
  try {
    await Fertilizer.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "FertilizerData Updated",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

/************************Post Unit ************************/
export const PostFertilizerUnit = async (req, res) => {
  const { unit } = req.body;
  try {
    await FertilizerUnit_M.create({
      unit: unit,
    });
    res.json({ msg: "Create Successful" });
  } catch (error) {
    res.json(error);
  }
};
/**************************************************************/

/************************Delete Unit ************************/
export const DeleteFertilizerUnit = async (req, res) => {
  try {
    await FertilizerUnit_M.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Fertilizer Unit Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
/**************************************************************/
export const TimeChemical = async (req, res) => {
  try {
    const Time = await db.query("SELECT * FROM residual_period_chemical ", {
      type: db.QueryTypes.SELECT,
    });
    res.json(Time);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateStatusTime = async (req, res) => {
  try {
    await ResidualPeriodChemical_M.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "status Updated",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const insertTimeChemical = async (req, res) => {
  const { time, unit } = req.body;
  try {
    await ResidualPeriodChemical_M.create({
      time: time,
      unit: unit,
      status: 1,
    });
    res.json({ msg: "Create Successful" });
  } catch (error) {
    res.json(error);
  }
};

export const deleteTimeChemical = async (req, res) => {
  try {
    await ResidualPeriodChemical_M.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Residual Period Chemical Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

/*------------------------- REPORT DEFACT --------------------------- */

export const CreateReportDefect = async (req, res) => {
    const { disease, bug, weed, remark } = req.body;
      try {
        await ReportDefectChemical_M.create({
          id_plant: req.params.id,
          disease: disease,
          bug: bug,
          weed: weed,
          remark: remark,
        });
        res.json({ msg: "Create Successful" });
      } catch (error) {
        //console.log(error);
        res.json(error);
      }
};


export const UpdateReportDefect = async (req, res) => {
  try {
    await ReportDefectChemical_M.update(req.body, {
      where: {
        id_plant: req.params.id,
      },
    });
    res.json({
      message: "Updated Successful",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};


export const ReportDefect = async (req, res) => {
  try {
    const Time = await db.query(
      "SELECT count(*) AS ReportDefect FROM report_defect_chemical where id_plant = :id ",
      {
        replacements: { id: req.params.id },
        type: db.QueryTypes.SELECT,
      }
    );
    res.json(Time);
  } catch (error) {
    res.json({ message: error.message });
  }
};

/*------------------  Report Result ------------------*/

export const ReportDefectData = async (req, res) => {
  try {
    const Defect = await db.query(
      "SELECT  report_defect_chemical.id, " +
        "        report_defect_chemical.id_plant, " +
        "        CONCAT(zone_plant.zone_name,'-',plant_detail.id_name_plant) AS zone_name," +
        "        report_defect_chemical.disease," +
        "        report_defect_chemical.bug," +
        "        report_defect_chemical.weed," +
        "        report_defect_chemical.remark," +
        "        DATE_FORMAT(report_defect_chemical.updatedAt, '%d-%m-%Y') as updatedAt," +
        "        plant_master_detail.plant_name," +
        "        plant_master_detail.plant_name_eng," +
        "        user.name, " +
        "        user.last_name  " +
        "FROM report_defect_chemical " +
        "LEFT JOIN plant_detail ON report_defect_chemical.id_plant = plant_detail.id " +
        "LEFT JOIN plant ON report_defect_chemical.id_plant = plant.id_plant " +
        "LEFT JOIN plant_master_detail ON plant.name_plant = plant_master_detail.id " +
        "LEFT JOIN user ON plant.id_user = user.id " +
        "LEFT JOIN zone_plant ON plant_detail.id_zone = zone_plant.id ",

      // "SELECT report_defect_chemical.id,         " +
      //   "       report_defect_chemical.id_plant,   " +
      //   "       CONCAT(zone_plant.zone_name,'-',plant_detail.id_name_plant) AS zone_name, " +
      //   "       report_defect_chemical.disease,    " +
      //   "       report_defect_chemical.bug,        " +
      //   "       report_defect_chemical.weed,       " +
      //   "       report_defect_chemical.remark,     " +
      //   "       DATE_FORMAT(report_defect_chemical.updatedAt, '%d-%m-%Y') as updatedAt,  " +
      //   "       plant_master_detail.plant_name,    " +
      //   "       plant_master_detail.plant_name_eng," +
      //   "       user.name,                         " +
      //   "       user.last_name                     " +
      //   " FROM report_defect_chemical " +
      //   " LEFT JOIN plant_detail ON report_defect_chemical.id_plant = plant_detail.id " +
      //   " LEFT JOIN plant ON report_defect_chemical.id_plant = plant.id_plant " +
      //   " LEFT JOIN plant_master_detail ON plant.name_plant = plant_master_detail.id " +
      //   " LEFT JOIN user ON plant.id_user = user.id " +
      //   " LEFT JOIN zone_plant ON plant_detail.id_zone = zone_plant.id ",
      {
        type: db.QueryTypes.SELECT,
      }
    );
    res.json(Defect);
  } catch (error) {
    res.json({ message: error.message });
  }
};

/*----------------------------------------------------*/