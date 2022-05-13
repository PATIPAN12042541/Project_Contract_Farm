import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;
const Type_Chemical = db.define('type_chemical',{
    type_chemical:{
        type: DataTypes.STRING,
    },
    status:{
        type: DataTypes.INTEGER,
    }
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 export default Type_Chemical;