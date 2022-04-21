import { Sequelize } from "sequelize";
const db = new Sequelize('contract_farm', 'ict', 'loboadmin', {
    host: "http://node30998-env-3297740.th1.proen.cloud",
    dialect: "mysql"
});
 export default db;
