import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;
const Menus = db.define('role_menu',{
    menu_name:{
        type: DataTypes.STRING
    },
    index_menu:{
        type: DataTypes.INTEGER
    },
    parent_id:{
        type: DataTypes.INTEGER
    },
    link:{
        type: DataTypes.STRING
    },
    status:{
        type: DataTypes.INTEGER
    },
    role_id:{
        type: DataTypes.INTEGER
    }
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 export default Menus;
