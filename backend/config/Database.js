import { Sequelize } from "sequelize";
const db = new Sequelize('contract_farm', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});
 export default db;
