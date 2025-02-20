import express from "express";
import { HeroController } from "../controllers/index.controller.js";

const heroes_router = express.Router()

heroes_router.get("/heroes/", HeroController.getAllHeroes);
heroes_router.get("/heroes/:id", HeroController.getHeroById);
heroes_router.get("/heroes/", HeroController.getAllHeroes);
heroes_router.post("/heroes/", HeroController.createHero);
heroes_router.put("/heroes/:id", HeroController.updateHero);
heroes_router.delete("/heroes/:id", HeroController.deleteHero);

heroes_router.patch("/heroes/:id/restore", HeroController.restoreHero)

export default heroes_router;