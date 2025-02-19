import {
  ConflictError,
  BadRequestError,
  NotFoundError,
} from "../errors/api.error.js";
import { HeroRepository, PowerRepository } from "../repositories/index.repository.js";
import RANKS from "../enums/rank.enum.js";
import { PowerService } from "./index.service.js";


// CREATE
export async function createHero({ hero_alias, hero_identity, hero_powerDate, hero_rank, power_label }) {
  if (!hero_alias || hero_alias.length < 3 || !/^[a-zA-Z ]+$/.test(hero_alias)) {
    throw new BadRequestError("Alias non valide (3 caractères min, etc.)");
  }

  if (await HeroRepository.heroExists(hero_alias)) {
    throw new ConflictError("Le héros existe déjà (alias).");
  }

  if (!hero_rank in Object.keys(RANKS)) {
    throw new BadRequestError("Rank non valide (S+, S, A, B, C)")
  }
  const rank_object = Object.entries(RANKS).find(([key]) => key === hero_rank)

  if (PowerService.powerExists(power_label)) {
    power_id = await PowerService.getPowerByLabel(power_label).power_id
  } else {
    power_id = await PowerService.createPower(power_label).power_id
  }

  
  const hero = await HeroRepository.createHero(
    { hero_alias, 
      hero_identity, 
      hero_powerDate, 
      rank_object, 
      power_id });

  return hero.dataValues;
}

// READ
export async function getHeroById(hero_id) {
  const hero = await HeroRepository.getHeroById(hero_id);

  if (!hero) {
    throw new NotFoundError("Le héros n'existe pas.");
  }

  return {
    hero_id: hero.hero_id,
    hero_alias: hero.hero_alias,
    hero_powerDate: hero.hero_powerDate.slice(-4),
    hero_rank: hero.hero_rank[0]
  };
}

export async function getDeletedHeroById(hero_id) {
  const hero = await HeroRepository.getDeletedHeroById(hero_id);

  if (!hero) {
    throw new NotFoundError("Le héros n'existe pas.");
  }

  return {
    hero_id: hero.hero_id,
    hero_alias: hero.hero_alias,
    hero_powerDate: hero.hero_powerDate.slice(-4),
    hero_rank: hero.hero_rank[0]
  };
}

export async function getAllHeroes() {
  const heroes = await HeroRepository.getAllHeroes();

  const formattedHeroes = heroes.map((hero) => {
    return {
      hero_id: hero.hero_id,
      hero_alias: hero.hero_alias,
      hero_powerDate: hero.hero_powerDate.slice(-4),
      hero_rank: hero.hero_rank[0],
    };
  });

  return formattedHeroes;
}

export async function getAllHeroesWithDeleted() {
  const heroes = await HeroRepository.getAllHeroesWithDeleted();

  const formattedHeroes = heroes.map((hero) => {
    return {
      hero_id: hero.hero_id,
      hero_alias: hero.hero_alias,
      hero_powerDate: hero.hero_powerDate.slice(-4),
      hero_rank: hero.hero_rank[0],
    };
  });

  return formattedHeroes;
}

export async function getAllHeroesDeleted() {
  const heroes = await HeroRepository.getAllHeroesDeleted();

  const formattedHeroes = heroes.map((hero) => {
    return {
      hero_id: hero.hero_id,
      hero_alias: hero.hero_alias,
      hero_powerDate: hero.hero_powerDate.slice(-4),
      hero_rank: hero.hero_rank[0],
    };
  });

  return formattedHeroes;
}

// UPDATE

export async function updateHero(hero_id, { hero_alias, hero_identity, hero_powerDate, hero_rank, power_label }) {
  if (!hero_alias || hero_alias.length < 3 || !/^[a-zA-Z ]+$/.test(hero_alias)) {
    throw new BadRequestError("Alias non valide (3 caractères min, etc.)");
  }

  if (await HeroRepository.heroExists(hero_alias)) {
    throw new ConflictError("Le héros existe déjà (alias).");
  }

  if (!await HeroRepository.getHeroById(hero_id)) {
    throw new NotFoundError("Le héros n'existe pas, id:");
  }

  if (!hero_rank in Object.keys(RANKS)) {
    throw new BadRequestError("Rank non valide (S+, S, A, B, C)")
  }
  const rank_object = Object.entries(RANKS).find(([key]) => key === hero_rank)


  if (PowerService.powerExists(power_label)) {
    power_id = await PowerService.getPowerByLabel(power_label).power_id
  } else {
    power_id = await PowerService.createPower(power_label).power_id
  }

  const hero = await HeroRepository.updateHero(hero_id, {
    hero_alias,
    hero_identity,
    hero_powerDate,
    rank_object,
    power_id
  });

  return hero.dataValues;
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


// DELETE

export async function deleteHero(hero_id) {
  if (!(await getHeroById(hero_id))) {
    throw new NotFoundError("Le héros n'existe pas.");
  }

  return await HeroRepository.deleteHero(hero_id);
}