import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;
const GROUP_USER = db.define('GROUP_USER_V',{
    ID:{
        type: DataTypes.STRING
    },
    NAME:{
        type: DataTypes.STRING
    },
    LAST_NAME:{
        type: DataTypes.STRING
    },
    GROUP_ID:{
        type: DataTypes.STRING
    },
    GROUP_NAME:{
        type: DataTypes.STRING
    },
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 export default GROUP_USER;