// console.log("HELLO")
import express from "express";
import appRoutes from "./routes";
import appConfig from "./config";
import { sequelize } from "./database/psql";
import errorHandler from "./error-handler";
const PORT = appConfig.port;

const app = express();

app.use(express.json());
// All apis entry points
app.use("/v1", appRoutes);

app.listen(PORT, async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("server is up and running ", PORT);
  } catch (er) {
    console.log("ERROR", er);
    process.exit(1);
  }
});

app.use(errorHandler);
