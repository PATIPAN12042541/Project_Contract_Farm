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

const PlantDetail = db.define(
  "plant_detail",
  {
    id_plant: {
      type: DataTypes.INTEGER,
    },
    id_name_plant: {
      type: DataTypes.STRING,
    },
    quantity_chemical: {
      type: DataTypes.INTEGER,
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
    timestamps: false,
  },
  {
    freezeTableName: true,
  }
);

Plant.hasMany(PlantDetail, { as: "plant_detail", foreignKey: "id_plant" });
PlantDetail.belongsTo(Plant, { foreignKey: "id_plant" });

(async () => {
  await db.sync();
})();

export default Plant;
