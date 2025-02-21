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
    throw new BadRequestError("Alias non valide (3 caractères min et caractères spéciaux interdits).");
  }

  if (await HeroRepository.heroExists(hero_alias)) {
    throw new ConflictError("Le héros existe déjà (alias).");
  }
  if (!(Object.keys(RANKS).includes(hero_rank))) {
    throw new BadRequestError("Rank non valide (S+, S, A, B, C)")
  }
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  if (!dateRegex.test(hero_powerDate) || !(new Date(hero_powerDate).toISOString().slice(0, 10) === hero_powerDate)) {
    throw new BadRequestError("Date d'obtention du pouvoir non valide (format YYYY-MM-DD attendu)")
  }

  const rank_object = Object.entries(RANKS).find(([key]) => key === hero_rank)
  let power = null
  if (power_label != "") {
    if (await PowerRepository.powerExists(power_label)) {
      const existingPower = await PowerService.getPowerByLabel(power_label)
      power = existingPower.power_id
    } else {
      const newPower = await PowerService.createPower(power_label)
      power = newPower.power_id
    }
  }

  const hero = await HeroRepository.createHero(
    {
      hero_alias,
      hero_identity,
      hero_powerDate,
      hero_rank: rank_object,
      hero_power_id: power
    });

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
    hero_powerDate: hero.hero_powerDate.slice(-5),
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
    hero_powerDate: hero.hero_powerDate.slice(-5),
    hero_rank: hero.hero_rank[0]
  };
}

export async function getAllHeroes() {
  const heroes = await HeroRepository.getAllHeroes();

  const formattedHeroes = heroes.map((hero) => {
    return {
      hero_id: hero.hero_id,
      hero_alias: hero.hero_alias,
      hero_powerDate: hero.hero_powerDate.slice(-5),
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
      hero_powerDate: hero.hero_powerDate.slice(-5),
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
      hero_powerDate: hero.hero_powerDate.slice(-5),
      hero_rank: hero.hero_rank[0],
    };
  });

  return formattedHeroes;
}

// UPDATE

export async function updateHero(hero_id, { hero_alias, hero_identity, hero_powerDate, hero_rank, power_label }) {
  if (!hero_alias || hero_alias.length < 3 || !/^[a-zA-Z ]+$/.test(hero_alias)) {
    throw new BadRequestError("Alias non valide (3 caractères min et caractères spéciaux interdits).");
  }

  if (!(Object.keys(RANKS).includes(hero_rank))) {
    throw new BadRequestError("Rank non valide (S+, S, A, B, C)")
  }
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  if (!dateRegex.test(hero_powerDate) || !(new Date(hero_powerDate).toISOString().slice(0, 10) === hero_powerDate)) {
    console.log(hero_powerDate)
    throw new BadRequestError("Date d'obtention du pouvoir non valide (format YYYY-MM-DD attendu)")
  }

  const rank_object = Object.entries(RANKS).find(([key]) => key === hero_rank)
  let power = null
  if (power_label != "") {
    if (await PowerRepository.powerExists(power_label)) {
      const existingPower = await PowerService.getPowerByLabel(power_label)
      power = existingPower.power_id
    } else {
      const newPower = await PowerService.createPower(power_label)
      power = newPower.power_id
    }
  }

  const hero = await HeroRepository.updateHero(hero_id, {
    hero_alias,
    hero_identity,
    hero_powerDate,
    hero_rank: rank_object,
    hero_power_id: power
  });

  return hero.dataValues;
}

export async function restoreHero(hero_id) {
  const restoredHero = await HeroRepository.getDeletedHeroById(hero_id);

  if (!restoredHero) {
    throw new NotFoundError(
      "Le héros n'existe pas. Le héros ne peut pas être restauré."
    );
  }

  if (await HeroRepository.heroExists(restoredHero.hero_alias)) {
    throw new ConflictError("L'alias existe déjà. Le héros ne peut pas être restauré.")
  }

  return HeroRepository.restoreHero(hero_id);
}


// DELETE

export async function deleteHero(hero_id) {
  if (!(await getHeroById(hero_id))) {
    throw new NotFoundError("Le héros n'existe pas.");
  }

  return await HeroRepository.deleteHero(hero_id);
}