import db from "../config/Database.js";

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
