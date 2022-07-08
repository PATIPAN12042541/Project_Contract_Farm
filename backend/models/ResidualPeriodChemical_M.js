import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const PlantDetail = db.define(
  "plant_detail",
  {
    id_name_plant: {
      type: DataTypes.STRING,
    },
    id_zone: {
      type: DataTypes.INTEGER,
    },
    autoid_check: {
      type: DataTypes.STRING,
    },
    unit: {
      type: DataTypes.STRING,
    },
    note: {
      type: DataTypes.STRING,
    },
    last_update: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();

export default PlantDetail;
