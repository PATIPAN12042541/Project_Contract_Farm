import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const NameChemical = db.define('name_chemical',{
    name_chemical:{
        type: DataTypes.STRING,
    },
    name_chemical_eng:{
        type: DataTypes.STRING,
    },
    eu_mrl:{
        type: DataTypes.STRING,
    },
    path_img:{
        type: DataTypes.STRING,
    },
    type_chemical_id:{
        type: DataTypes.INTEGER,
    },
    status:{
        type: DataTypes.INTEGER,
    },
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 export default NameChemical;