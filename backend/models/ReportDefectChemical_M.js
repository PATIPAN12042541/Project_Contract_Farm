import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const ReportDefectChemical_M = db.define(
  "report_defect_chemical",
  {
    id_plant: {
      type: DataTypes.INTEGER,
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
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();

export default ReportDefectChemical_M;
