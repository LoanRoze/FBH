import {
  ConflictError,
  BadRequestError,
  NotFoundError,
} from "../errors/api.error.js";
import { HeroRepository } from "../repositories/index.repository.js";

export async function getHeroById(hero_id) {
  const hero = await HeroRepository.getHeroById(hero_id);

  if (!hero) {
    throw new NotFoundError("Le héros n'existe pas.");
  }

  return {
    hero_id: hero.hero_id,
    hero_alias: hero.hero_alias,
    hero_powerDate: hero.hero_powerDate.slice(-4),
  };
}

export async function createHero({ hero_alias, hero_identity, hero_powerDate }) {
  if (!hero_alias || hero_alias.length < 3 || !/^[a-zA-Z ]+$/.test(hero_alias)) {
    throw new BadRequestError("Alias non valide (3 caractères min, etc.)");
  }

  if (await HeroRepository.heroExists(hero_alias)) {
    throw new ConflictError("Le héros existe déjà (alias).");
  }

  const hero = await HeroRepository.createHero({ hero_alias, hero_identity, hero_powerDate });

  return hero.dataValues;
}

export async function updateHero(hero_id, { hero_alias, hero_identity, hero_powerDate }) {
  if (!hero_alias || hero_alias.length < 3 || !/^[a-zA-Z ]+$/.test(hero_alias)) {
    throw new BadRequestError("Alias non valide (3 caractères min, etc.)");
  }

  if (await HeroRepository.heroExists(hero_alias)) {
    throw new ConflictError("Le héros existe déjà (alias).");
  }

  if (!await HeroRepository.getHeroById(hero_id)) {
    throw new NotFoundError("Le héros n'existe pas, id:");
  }

  const hero = await HeroRepository.updateHero(hero_id, {
    hero_alias,
    hero_identity,
    hero_powerDate,
  });

  return hero.dataValues;
}

export async function deleteHero(hero_id) {
  if (!(await getHeroById(hero_id))) {
    throw new NotFoundError("Le héros n'existe pas.");
  }

  return await HeroRepository.deleteHero(hero_id);
}

export async function getAllHeroes() {
  const heroes = await HeroRepository.getAllHeroes();

  const formattedHeroes = heroes.map((hero) => {
    return {
      hero_id: hero.hero_id,
      hero_alias: hero.hero_alias,
      hero_powerDate: hero.hero_powerDate.slice(-4),
    };
  });

  return formattedHeroes;
}

export async function restoreHero(hero_id) {
  const restoredHero = await HeroRepository.restoreHero(hero_id);

  if (!restoredHero) {
    throw new NotFoundError(
      "Le héros n'existe pas. Le héros ne peut pas être restauré."
    );
  }

  if (await HeroRepository.heroExists(restoredHero.hero_alias)) {
    throw new ConflictError("L'alias existe déjà. Le héros ne peut pas être restauré.")
  }

  return restoredHero;
}
