import { Sequelize } from "sequelize";
import appConfig from "../config";

const sequelize = new Sequelize({
  password: appConfig.sql.password,
  host: appConfig.sql.host,
  database: appConfig.sql.database,
  username: appConfig.sql.username,
  dialect: "postgres",
  port: appConfig.sql.port,
  //   logging: true,
  //This should only we allowed in local or dev
  // sync: { force: true },
});

//Here sequelize is database connection variable
export { sequelize, Sequelize };
