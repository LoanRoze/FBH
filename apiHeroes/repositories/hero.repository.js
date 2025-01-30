import Hero from "../models/hero.model.js";

export async function createHero({ alias, identity, powerDate }) {
  const hero = await Hero.create({ alias, identity, powerDate });
  return hero;
}

export async function getHeroById(id) {
  const hero = await Hero.findByPk(id);
  if (!hero) {
    return null;
  }

  return hero;
}

export async function getDeletedHeroById(id) {
  const hero = await Hero.scope("deleted").findByPk(id);
  if (!hero) {
    return null;
  }

  return hero;
}

export async function updateHero(id, values) {
  const hero = await getHeroById(id);
  if (!hero) {
    return null;
  }

  return await hero.update(values);
}

export async function deleteHero(id) {
  const hero = await getHeroById(id);
  if (!hero) {
    return null;
  }

  return await updateHero(hero.id, { isDeleted: true });
}

export async function getAllHeroes() {
  return await Hero.findAll();
}

export async function heroExists(alias) {
  const hero = await Hero.findOne({ where: { alias } });
  return Boolean(hero);
}

export async function heroDeletedExists(alias) {
  const hero = await Hero.scope("deleted").findOne({ where: { alias } });
  return Boolean(hero);
}

export async function getAllHeroesWithDeleted() {
  await Hero.scope("withDeleted").findAll();
}

export async function getAllHeroesDeleted() {
  await Hero.scope("deleted").findAll();
}

export async function restoreHero(id) {
  const deletedHero = await getDeletedHeroById(id);  

  if (!deletedHero) {
    return null;
  }

  return await deletedHero.update({ isDeleted: false });
}
