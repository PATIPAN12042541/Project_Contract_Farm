import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const Plant = db.define(
  "plant",
  {
    id_plant: {
      type: DataTypes.INTEGER,
    },
    id_user: {
      type: DataTypes.INTEGER,
    },
    name_plant: {
      type: DataTypes.INTEGER,
    },
    start_date_plant: {
      type: DataTypes.DATE,
    },
    end_date_plant: {
      type: DataTypes.DATE,
    },
    // plant_image: {
    //   type: DataTypes.STRING,
    // },
    status_plant: {
      type: DataTypes.INTEGER,
    },
    status_circle: {
      type: DataTypes.INTEGER,
    },
    comment: {
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

export default Plant;
