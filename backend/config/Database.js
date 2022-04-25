import { Sequelize } from "sequelize";
const db = new Sequelize('contract_farm', 'ict', '@Loboadmin1', {
    host: '127.0.0.1',
    dialect: "mysql"
});
 export default db;
