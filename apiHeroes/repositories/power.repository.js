import Power from "../models/power.model.js";

// CREATE
export async function createPower({ label }) {
  const power = await Power.create({ label });
  return power;
}

// READ
export async function getPowerById(id) {
  const power = await Power.findByPk(id);
  if (!power) {
    return null;
  }

  return power;
}

export async function getDeletedPowerById(id) {
  const power = await Power.scope("deleted").findByPk(id);
  if (!power) {
    return null;
  }

  return power;
}

export async function getAllPowers() {
  return await Power.findAll();
}

export async function getPowerByLabel(label) {
  return await Power.findOne({ where: { label } });
}

export async function getAllPowersDeleted() {
  return await Power.scope("deleted").findAll();
}

export async function powerExists(label) {
  const power = await Power.findOne({ where: { label } });
  return Boolean(power);
}

// UPDATE
export async function updatePower(id, values) {
  const power = await getPowerById(id);
  if (!power) {
    return null;
  }

  return await power.update(values);
}

export async function asignPowerToHero(heroId, powerId) {
  const power = await getPowerById(powerId);
  if (!power) {
    return null;
  }

  return await power.addHero(heroId);
}

export async function restorePower(id) {
  const power = await Power.scope("deleted").findByPk(id);
  if (!power) {
    return null;
  }

  return await updatePower(power.id, { isDeleted: false });
}

// DELETE
export async function deletePower(id) {
  const power = await getPowerById(id);
  if (!power) {
    return null;
  }

  return await updatePower(power.id, { isDeleted: true });
}

export async function unassignPowerToHero(heroId, powerId) {
  const power = await getPowerById(powerId);
  if (!power) {
    return null;
  }

  return await power.removeHero(heroId);
}
