// console.log("HELLO")
import express from "express";
import appRoutes from "./routes";
import appConfig from "./config";
import { sequelize } from "./database/psql";
import errorHandler from "./error-handler";
import cors from "cors";
const PORT = appConfig.port;

const app = express();
// !!TODO Cors configuration need to be done before moving to prod
app.use(cors());

app.use(express.json());
// All apis entry points
app.use("/v1", appRoutes);

app.listen(PORT, async () => {
  try {
    await sequelize.sync({
      ...(appConfig.environment !== "PROD" ? { force: true } : { alter: true }),
    });
    console.log("server is up and running ", PORT);
  } catch (er) {
    console.log("ERROR", er);
    process.exit(1);
  }
});

app.use(errorHandler);
