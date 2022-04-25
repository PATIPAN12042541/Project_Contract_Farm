import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;

const Plant = db.define(
  "plant",
  {
    id_plant: {
      type: DataTypes.INTEGER,
    },
    name_plant: {
      type: DataTypes.STRING,
    },
    start_date_plant: {
      type: DataTypes.DATE,
    },
    end_date_plant: {
      type: DataTypes.DATE,
    },
    plant_image: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

const Plant_Detail = db.define(
  "plant_detail",
  {
    id_plant: {
      type: DataTypes.INTEGER,
    },
    id_name_plant: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

Plant.hasMany(Plant_Detail);

(async () => {
  await db.sync();
})();
export default Plant;
