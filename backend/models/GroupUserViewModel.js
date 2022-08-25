import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const GroupUserView = db.define('GROUP_USER_V',{
    id:{
        type: DataTypes.STRING,
    },
    name:{
        type: DataTypes.STRING,
    },
    last_name:{
        type: DataTypes.STRING,
    },
    group_id:{
        type: DataTypes.STRING,
    },
    group_name:{
        type: DataTypes.INTEGER,
    },
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 export default GroupUserView;