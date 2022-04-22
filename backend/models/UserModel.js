import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;
const Users = db.define('user',{
    username:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    name:{
        type: DataTypes.STRING
    },
    last_name:{
        type: DataTypes.STRING
    },
    role_id:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 export default Users;
