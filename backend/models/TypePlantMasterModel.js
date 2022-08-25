import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const Type_Plant_Master = db.define(
  "type_plant_master",
  {
    type_plant_name: {
      type: DataTypes.STRING,
    },
    status_: {
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
export default Type_Plant_Master;
