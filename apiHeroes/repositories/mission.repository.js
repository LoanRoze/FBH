import Mission from "../models/mission.model.js";

export async function createMission({ type, location, date, rank }) {
  const mission = await Mission.create({ type, location, date, rank });
  return mission;
}

export async function getMissionById(id) {
  const mission = await Mission.findByPk(id);
  if (!mission) {
    return null;
  }

  return mission;
}

export async function getMissionsDeleted() {
  return await Mission.scope("deleted").findAll();
}

export async function getAllMissions() {
  return await Mission.findAll();
}

export async function missionExists(type) {
  const mission = await Mission.findOne({ where: { type } });
  return Boolean(mission);
}

export async function updateMission(id, values) {
  const mission = await getMissionById(id);
  if (!mission) {
    return null;
  }

  return await mission.update(values);
}

export async function updateAssignedMissionToHero(id, heroId) {
  const mission = await getMissionById(id);
  if (!mission) {
    return null;
  }

  return await mission.update({ heroId });
}

export async function assignMissionToHero(heroId, missionId) {
  const mission = await getMissionById(missionId);
  if (!mission) {
    return null;
  }

  return await mission.update({ heroId });
}

export async function deleteMission(id) {
  const mission = await getMissionById(id);
  if (!mission) {
    return null;
  }

  return await mission.destroy();
}

export async function unassignMissionToHero(id) {
  const mission = await getMissionById(id);
  if (!mission) {
    return null;
  }

  return await mission.update({ heroId: null });
}