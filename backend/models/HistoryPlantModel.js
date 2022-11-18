import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const HistoryPlant = db.define(
  "history_contract_farming",
  {
    zone_id: {
      type: DataTypes.INTEGER,
    },
    zone_name: {
      type: DataTypes.STRING,
    },
    zone_image: {
      type: DataTypes.STRING,
    },
    plant_id: {
      type: DataTypes.INTEGER,
    },
    plant_id_name: {
      type: DataTypes.STRING,
    },
    plant_name: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    plant_date_start: {
      type: DataTypes.DATE,
    },
    plant_date_end: {
      type: DataTypes.DATE,
    },
    chemical_id: {
      type: DataTypes.INTEGER,
    },
    residual_period_id: {
      type: DataTypes.INTEGER,
    },
    chemical_cc: {
      type: DataTypes.INTEGER,
    },
    chemical_liter: {
      type: DataTypes.INTEGER,
    },
    chemical_note: {
      type: DataTypes.STRING,
    },
    disease: {
      type: DataTypes.INTEGER,
    },
    bug: {
      type: DataTypes.INTEGER,
    },
    weed: {
      type: DataTypes.INTEGER,
    },
    remark: {
      type: DataTypes.STRING,
    },
    chemical_date_start: {
      type: DataTypes.DATE,
    },
    chemical_date_end: {
      type: DataTypes.DATE,
    },
    Path_harvest_img: {
      type: DataTypes.STRING,
    },
    qty: {
      type: DataTypes.INTEGER,
    },
    plant_status: {
      type: DataTypes.INTEGER,
    },
    plant_circle: {
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
export default HistoryPlant;
