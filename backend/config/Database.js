import { Sequelize } from "sequelize";
const db = new Sequelize('contract_farm', 'ict', '@Loboadmin1', {
    host: process.env.HOST_NAME,
    dialect: "mysql"
});
 export default db;
