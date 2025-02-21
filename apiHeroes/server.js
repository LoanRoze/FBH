import cors from "cors";
import sequelize from "./config/database.js";
import express from "express";
import heroes_router from "./routers/hero.router.js";
import { logMiddleware } from "./middlewares/log.middleware.js";

import { initializeHeroMock } from "./services/mock.service.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import powers_router from "./routers/power.router.js";
import missions_router from "./routers/mission.router.js";

await sequelize.sync({ force: false });
console.log("Base de donnée synchronisée !");

await initializeHeroMock();

const app = express();

app.use(cors())
app.use(express.json());
app.use(logMiddleware);

app.use("/api/v1/", heroes_router);
app.use("/api/v1/", powers_router);
app.use("/api/v1/", missions_router);

app.use(errorHandler)

app.listen(3000, () => console.log("Server listen on http://localhost:3000"));
