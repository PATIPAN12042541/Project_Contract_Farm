import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const PlantDataDetail_M = db.define(
  "plant_data_detail",
  {
    id_plant: {
      type: DataTypes.INTEGER,
    },
    id_name_chemical: {
      type: DataTypes.INTEGER,
    },
    id_residual_period: {
      type: DataTypes.INTEGER,
    },
    cc: {
      type: DataTypes.INTEGER,
    },
    liter: {
      type: DataTypes.INTEGER,
    },
    note: {
      type: DataTypes.STRING,
    },
    date_start: {
      type: DataTypes.DATE,
    },
    date_end: {
      type: DataTypes.DATE,
    },
    status_check: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();

export default PlantDataDetail_M;
