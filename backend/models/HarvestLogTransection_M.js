import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const HarvestLogTransection = db.define(
  "harvest_log_transection",
  {
    id_plant: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    time_log: {
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
export default HarvestLogTransection;
