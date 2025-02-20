import express from "express";
import { MissionController } from "../controllers/index.controller.js";

const router = express.Router()

router.get("/", MissionController.getAllMissions);
router.get("/:id", MissionController.getMissionById);
router.post("/", MissionController.createMission);
router.post("/", MissionController.assignHeroToMission);
router.put("/:id", MissionController.updateMission);
router.delete("/:id", MissionController.deleteMission);

router.patch("/:id/restore", MissionController.restoreMission)

export default router;