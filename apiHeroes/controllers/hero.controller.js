import { HeroService } from "../services/index.service.js";

// CREATE
export async function createHero(req, res, next) {
  try {
    const { hero_alias, hero_identity, hero_powerDate, hero_rank, power_label } = req.body;
    const newHero = await HeroService.createHero({
      hero_alias,
      hero_identity,
      hero_powerDate,
      hero_rank,
      power_label
    });
    res.json(newHero);
  } catch (error) {
    next(error);
  }
}

// READ
export async function getHeroById(req, res, next) {
  try {
    const id = req.params.id;
    const hero = await HeroService.getHeroById(id);
    res.json(hero);
  } catch (error) {
    next(error);
  }
}

export async function getDeletedHeroById(req, res, next) {
  try {
    const id = req.params.id;
    const hero = await HeroService.getDeletedHeroById(id);
    res.json(hero);
  } catch (error) {
    next(error);
  }
}

export async function getAllHeroes(req, res, next) {
  try {
    const heroes = await HeroService.getAllHeroes();
    res.json(heroes);
  } catch (error) {
    next(error);
  }
}

export async function getAllHeroesWithDeleted(req, res, next) {
  try {
    const heroes = await HeroService.getAllHeroesWithDeleted();
    res.json(heroes);
  } catch (error) {
    next(error);
  }
}

export async function getAllHeroesDeleted(req, res, next) {
  try {
    const heroes = await HeroService.getAllHeroesDeleted();
    res.json(heroes);
  } catch (error) {
    next(error);
  }
}

// UPDATE
export async function updateHero(req, res, next) {
  try {
    const id = req.params.id;
    const { hero_alias, hero_identity, hero_powerDate, hero_rank, power_label } = req.body;
    const hero = await HeroService.updateHero(id, {
      hero_alias,
      hero_identity,
      hero_powerDate,
      hero_rank,
      power_label
    });
    res.json(hero);
  } catch (error) {
    next(error);
  }
}

export async function restoreHero(req, res, next) {
  try {
    const id = req.params.id;
    const hero = await HeroService.restoreHero(id);
    res.json(hero);
  } catch (error) {
    next(error);
  }
}

// DELETE
export async function deleteHero(req, res, next) {
  try {
    const id = req.params.id;
    await HeroService.deleteHero(id);
    res.json("Le héros a été supprimé");
  } catch (error) {
    next(error);
  }
}