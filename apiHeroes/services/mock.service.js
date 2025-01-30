import { heroesMocks } from "../mocks/hero.mock.js";
import { HeroService } from "./index.service.js";

export async function initializeHeroMock() {
  console.log("========== START HERO MOCKING ==========");
  for (const hero of heroesMocks) {
    try {
      const newHero = await HeroService.createHero(hero);
      console.log(newHero);
    } catch (error) {
      console.log("[ERROR]", error.message);
    }
  }
  console.log("========== ENDING HERO MOCKING ==========");
  return await HeroService.getAllHeroes();
}
