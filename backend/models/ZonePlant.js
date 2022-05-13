import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;
const ZonePlant = db.define(
  "zone_plant",
  {
    zone_name: {
      type: DataTypes.STRING,
    },
    image_zone: {
      type: DataTypes.STRING,
    },
    auto_id_zone: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();
export default ZonePlant;
