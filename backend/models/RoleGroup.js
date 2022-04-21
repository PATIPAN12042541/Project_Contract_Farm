import { Sequelize } from "sequelize";
import db from "../config/Database";
const { DataTypes } = Sequelize;
 const RoleGroups = db.define('role_group',{
    role_group_name:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 export default RoleGroups;
