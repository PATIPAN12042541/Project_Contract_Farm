import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
const { DataTypes } = Sequelize;
 const RoleGroup = db.define('role_group',{
    role_group_name:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true
});

RoleGroup.hasMany(Users, {
    foreignKey: 'role_id'
  });
  Users.belongsTo(RoleGroup);
 
(async () => {
    await db.sync();
})();
 export default RoleGroup;
