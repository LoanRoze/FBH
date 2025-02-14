import Mission from "../models/mission.model.js";
import Mission_Hero from "../models/mission_hero.model.js";
import { getHeroById } from "./hero.repository.js";

// CREATE
export async function createMission({ mission_type, mission_location, mission_date, mission_rank }) {
  const mission = await Mission.create({ mission_type, mission_location, mission_date, mission_rank });
  return mission;
}

export async function assignHeroToMission(hero_id, mission_id) {
  const mission = await getMissionById(mission_id);
  const hero = await getMissionById(hero_id);
  if (!mission || !hero) {
    return null;
  }

  const mission_hero = await Mission_Hero.create({ hero_id, mission_id })

  return mission_hero
}

export async function assignHeroesToMission(heroes_id, mission_id) {
  const mission_heroes = heroes_id.map(hero_id => { assignHeroToMission(hero_id, mission_id) })
  return mission_heroes
}


// READ
export async function getMissionById(mission_id) {
  const mission = await Mission.findByPk(mission_id);
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

export async function missionExists(mission_type) {
  const mission = await Mission.findOne({ where: { mission_type } });
  return Boolean(mission);
}

export async function getMissionHeroId(hero_id, mission_id) {
  const hero = await getHeroById(hero_id)
  const mission = await getMissionById(mission_id)

  if (!hero || !mission) {
    return null
  }
  const mission_hero_id = await Mission_Hero.findOne({ where: { hero_id, mission_id } })
  return mission_hero_id
}

// UPDATE 
export async function updateMission(mission_id, mission_values) {
  const mission = await getMissionById(mission_id);
  if (!mission) {
    return null;
  }

  return await mission.update(mission_values);
}

export async function removeHeroFromMission(hero_id, mission_id) {
  const hero_mission = await getMissionHeroId(hero_id, mission_id)
  
  if (!hero_mission) {
    return null
  }
  
  return await hero_mission.destroy()
}


// DELETE
export async function deleteMission(id) {
  const mission = await getMissionById(id);
  if (!mission) {
    return null;
  }

  return await mission.destroy();
}

