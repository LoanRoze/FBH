import Power from "../models/power.model.js";

// CREATE
export async function createPower({ power_label }) {
  const power = await Power.create({ power_label });
  return power;
}

// READ
export async function getPowerById(power_id) {
  const power = await Power.findByPk(power_id);
  if (!power) {
    return null;
  }

  return power;
}

export async function getDeletedPowerById(power_id) {
  const power = await Power.scope("deleted").findByPk(power_id);
  if (!power) {
    return null;
  }

  return power;
}

export async function getAllPowers() {
  return await Power.findAll();
}

export async function getPowerByLabel(power_label) {
  const power = await Power.findOne({ where: { power_label } });

  if (!power) {
    return null;
  }
  
  return power
}

export async function getAllPowersDeleted() {
  return await Power.scope("deleted").findAll();
}

export async function powerExists(power_label) {
  const power = await Power.findOne({ where: { power_label } });
  return Boolean(power);
}

// UPDATE
export async function updatePower(power_id, values) {
  const power = await getPowerById(power_id);
  if (!power) {
    return null;
  }

  return await power.update(values);
}

export async function restorePower(power_id) {
  const power = await Power.scope("deleted").findByPk(power_id);
  if (!power) {
    return null;
  }

  return await updatePower(power.id, { isDeleted: false });
}

// DELETE
export async function deletePower(power_id) {
  const power = await getPowerById(power_id);
  if (!power) {
    return null;
  }

  return await updatePower(power.id, { isDeleted: true });
}

