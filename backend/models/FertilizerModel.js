import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const Fertilizer = db.define(
  "plant_data_detail_fertilizer",
  {
    id_plant: {
      type: DataTypes.INTEGER,
    },
    id_name_chemical: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    unit: {
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
export default Fertilizer;
