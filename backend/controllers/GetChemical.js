import db from "../config/Database.js";

export const getChemical = async (req, res) => {
  try {
    const chemical = await db.query(
      "SELECT id,name_chemical,name_chemical_eng,eu_mrl,path_img FROM name_chemical",
      {
        type: db.QueryTypes.SELECT,
      }
    );
    res.json(chemical);
  } catch (error) {
    res.json({ message: error.message });
  }
};


export const getSelect = async (req, res) => {
  try {
    const Select = await db.query(
      "SELECT id,name_chemical,name_chemical_eng,eu_mrl,path_img FROM name_chemical where id = :id ",
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
