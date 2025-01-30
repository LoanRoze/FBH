import express from "express";
import { HeroController } from "../controllers/index.controller.js";

const router = express.Router()

router.get("/", HeroController.getAllHeroes);
router.get("/:id", HeroController.getHeroById);
router.post("/", HeroController.createHero);
router.put("/:id", HeroController.updateHero);
router.delete("/:id", HeroController.deleteHero);

router.patch("/:id/restore", HeroController.restoreHero)

export default router;