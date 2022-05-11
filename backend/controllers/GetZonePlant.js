import db from "../config/Database.js";

export const GetZonePlant = async (req, res) => {
  try {
    const zoneplant = await db.query(
      "SELECT plant_detail.id as id_plant," +
        "id_zone," +
        "id_name_plant," +
        "zone_name," +
        "image_zone " +
        "FROM plant_detail " +
        "LEFT JOIN zone_plant ON plant_detail.id_zone =zone_plant.id",
      {
        type: db.QueryTypes.SELECT,
      }
    );
    res.json(zoneplant);
  } catch (error) {
    res.json({ message: error.message });
  }
};
