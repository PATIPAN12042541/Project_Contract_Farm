import db from "../config/Database.js";
import NameChemical from "../models/ChemicalModel.js";
import PlantDataDetail_M from "../models/PlantDataDetails_M.js";


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
        "Where name_chemical.status = 1 AND name_chemical.type_chemical_id = 5 ",
      {
        type: db.QueryTypes.SELECT,
      }
    );
    res.json(chemical);
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
