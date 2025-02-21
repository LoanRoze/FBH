import express from "express";
import { MissionController } from "../controllers/index.controller.js";

const missions_router = express.Router()

missions_router.get("/missions/", MissionController.getAllMissions);
missions_router.get("/missions/:id", MissionController.getMissionById);
missions_router.post("/missions/", MissionController.createMission);
missions_router.post("/heroes-missions/", MissionController.assignHeroToMission);
missions_router.delete("/heroes-missions/", MissionController.removeHeroFromMission);
missions_router.put("/missions/:id", MissionController.updateMission);
missions_router.delete("/missions/:id", MissionController.deleteMission);


export default missions_router;