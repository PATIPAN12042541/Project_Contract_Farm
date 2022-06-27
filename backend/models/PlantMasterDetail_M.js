import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const PlantMasterDetail = db.define(
  "plant_master_detail",
  {
    plant_name: {
      type: DataTypes.STRING,
    },
    plant_name_eng: {
      type: DataTypes.STRING,
    },
    plant_img: {
      type: DataTypes.STRING,
    },
    status_show: {
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

export default PlantMasterDetail;
