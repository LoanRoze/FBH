import cors from "cors";
import sequelize from "./config/database.js";
import express from "express";
import router from "./routers/hero.router.js";
import { logMiddleware } from "./middlewares/log.middleware.js";

import { initializeHeroMock } from "./services/mock.service.js";
import { errorHandler } from "./middlewares/error.middleware.js";

await sequelize.sync({ force: true });
console.log("Base de donnée synchronisée !");

await initializeHeroMock();

const app = express();

app.use(cors())
app.use(express.json());
app.use(logMiddleware);

app.use("/api/v1/heroes/", router);

app.use(errorHandler)

app.listen(3000, () => console.log("Server listen on http://localhost:3000"));
