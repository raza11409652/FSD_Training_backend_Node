import dotenv from "dotenv";
dotenv.config();
const appConfig = {
  port: process.env.PORT || 8082,
  //   env: process.env.NODE_ENV,
  environment: process.env.APP_ENV || "DEV",
  sql: {
    username: process.env.SQL_USER_NAME || "root",
    password: process.env.SQL_PASSWORD || "",
    database: process.env.SQL_DATABASE || "database_task_mgt",
    port: process.env.SQL_PORT ? Number(process.env.SQL_PORT) : 5432,
    host: process.env.SQL_HOST || "localhost",
  },
  gcp: {
    clientId: process.env.GCP_CLIENT_ID || "",
    projectId: process.env.GCP_PROJECT_ID || "",
    clientSecret: process.env.GCP_CLIENT_SECRET || "",
    redirectURL: process.env.GCP_AUTH_REDIRECT || "",
  },
  jwtToken: process.env.JWT_SECRET_KEY || "",
};
export default appConfig;
