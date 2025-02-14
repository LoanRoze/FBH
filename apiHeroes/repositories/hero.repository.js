import Hero from "../models/hero.model.js";

// CREATE
export async function createHero({ hero_alias, hero_identity, hero_powerDate, hero_rank, power_id }) {
  const hero = await Hero.create({ hero_alias, hero_identity, hero_powerDate, hero_rank, power_id });
  return hero;
}

// READ
export async function getHeroById(hero_id) {
  const hero = await Hero.findByPk(hero_id);
  if (!hero) {
    return null;
  }

  return hero;
}

export async function getDeletedHeroById(hero_id) {
  const hero = await Hero.scope("deleted").findByPk(hero_id);
  if (!hero) {
    return null;
  }

  return hero;
}

export async function getAllHeroes() {
  return await Hero.findAll();
}

export async function heroExists(hero_alias) {
  const hero = await Hero.findOne({ where: { hero_alias } });
  return Boolean(hero);
}

export async function heroDeletedExists(hero_alias) {
  const hero = await Hero.scope("deleted").findOne({ where: { hero_alias } });
  return Boolean(hero);
}

export async function getAllHeroesWithDeleted() {
  await Hero.scope("withDeleted").findAll();
}

export async function getAllHeroesDeleted() {
  await Hero.scope("deleted").findAll();
}


// UPDATE 
export async function updateHero(hero_id, values) {
  const hero = await getHeroById(hero_id);
  if (!hero) {
    return null;
  }

  return await hero.update(values);
}

export async function restoreHero(hero_id) {
  const deletedHero = await getDeletedHeroById(hero_id);

  if (!deletedHero) {
    return null;
  }

  return await deletedHero.update({ hero_isDeleted: false });
}

export async function setHeroPower(hero_id, power_id) {
  const hero = await getHeroById(hero_id);

  if (!hero) {
    return null;
  }

  return hero.setDataValue('power_id', power_id)
}

export async function removePowerFromHero(hero_id) {
  const hero = await getHeroById(hero_id);

  if (!hero) {
    return null;
  }

  return hero.setDataValue('power_id', null)
}


// DELETE
export async function deleteHero(hero_id) {
  const hero = await getHeroById(hero_id);
  if (!hero) {
    return null;
  }

  return await updateHero(hero.hero_id, { hero_isDeleted: true });
}




