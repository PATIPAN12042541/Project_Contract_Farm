import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;
 const RoleGroup = db.define('role_group',{
    role_group_name:{
        type: DataTypes.STRING
    },
    status:{
        type:DataTypes.INTEGER
    }
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 export default RoleGroup;
