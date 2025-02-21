import {
  ConflictError,
  BadRequestError,
  NotFoundError,
} from "../errors/api.error.js";
import {
  HeroRepository,
  MissionRepository,
} from "../repositories/index.repository.js";
import RANKS from "../enums/rank.enum.js";
import { getHeroById } from "./hero.service.js";

// CREATE
export async function createMission({
  mission_type,
  mission_location,
  mission_date,
  mission_rank,
}) {
  if (!mission_type || !/^[a-zA-Z ]+$/.test(mission_type)) {
    throw new BadRequestError(
      "Type de la mission non valide (pas de charactères spéciaux)"
    );
  }
  if (!mission_location || !/^[a-zA-Z ]+$/.test(mission_location)) {
    throw new BadRequestError(
      "Lieu de la mission non valide (pas de charactères spéciaux)"
    );
  }

  if (!Object.keys(RANKS).includes(mission_rank)) {
    throw new BadRequestError("Rank de la mission non valide (S+, S, A, B, C)");
  }
  const rank_object = Object.entries(RANKS).find(
    ([key]) => key === mission_rank
  );

  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  if (
    !dateRegex.test(mission_date) ||
    !(new Date(mission_date).toISOString().slice(0, 10) === mission_date)
  ) {
    throw new BadRequestError(
      "Date de la mission non valide (format YYYY-MM-DD attendu)"
    );
  }

  const mission = await MissionRepository.createMission({
    mission_type,
    mission_location,
    mission_date,
    mission_rank: rank_object,
  });

  return mission.dataValues;
}

export async function assignHeroToMission(hero_id, mission_id) {
  const hero = await getHeroById(hero_id);
  const mission = await getMissionById(mission_id);
  console.log(hero, mission);

  if (!hero || !mission) {
    throw new NotFoundError("Le hero ou la mission n'a pas été trouvé");
  }
  if (hero.hero_rank[1] < mission.mission_rank[1]) {
    throw new BadRequestError(
      "le rank du héro est trop faible pour accepter la mission"
    );
  }

  const mission_hero = await MissionRepository.assignHeroToMission(
    hero_id,
    mission_id
  );
  return mission_hero;
}

export async function assignHeroesToMission(heroes_id, mission_id) {
  const validHeroesAssignedToMission = heroes_id.map(async (hero_id) => {
    return assignHeroToMission(hero_id, mission_id);
  });
  return validHeroesAssignedToMission;
}

// READ

export async function getMissionById(mission_id) {
  const mission = await MissionRepository.getMissionById(mission_id);

  if (!mission) {
    throw new NotFoundError("La mission n'existe pas.");
  }

  return {
    mission_id: mission.mission_id,
    mission_type: mission.mission_type,
    mission_location: mission.mission_location,
    mission_date: mission.mission_date,
    mission_rank: mission.mission_rank[0],
  };
}

export async function getMissionHeroId(hero_id, mission_id) {
  const mission_hero = await MissionRepository.getMissionById(mission_id);

  if (!mission_hero) {
    throw new NotFoundError("Le héro n'est pas attribué a la mission");
  }

  return {
    hero_id: mission_hero.hero_id,
    mission_id: mission_hero.mission_id,
  };
}

export async function getAllMissions() {
  const missions = await MissionRepository.getAllMissions();

  const formattedMissions = missions.map((mission) => {
    return {
      mission_id: mission.mission_id,
      mission_type: mission.mission_type,
      mission_location: mission.mission_location,
      mission_date: mission.mission_date,
      mission_rank: mission.mission_rank[0],
    };
  });

  return formattedMissions;
}

export async function getMissionsDeleted() {
  const missions = await MissionRepository.getMissionsDeleted();

  const formattedMissions = missions.map((mission) => {
    return {
        mission_id: mission.mission_id,
      mission_type: mission.mission_type,
      mission_location: mission.mission_location,
      mission_date: mission.mission_date,
      mission_rank: mission.mission_rank[0],
    };
  });

  return formattedMissions;
}

// UPDATE

export async function updateMission(
  mission_id,
  { mission_type, mission_location, mission_date, mission_rank }
) {
  const mission = await getMissionById(mission_id);

  if (!mission) {
    throw new NotFoundError("La mission n'a pas été trouvé");
  }
  if (!mission_type || !/^[a-zA-Z ]+$/.test(mission_type)) {
    throw new BadRequestError(
      "Type de la mission non valide (pas de charactères spéciaux)"
    );
  }
  if (!mission_location || !/^[a-zA-Z ]+$/.test(mission_location)) {
    throw new BadRequestError(
      "Lieu de la mission non valide (pas de charactères spéciaux)"
    );
  }

  if (!Object.keys(RANKS).includes(mission_rank)) {
    throw new BadRequestError("Rank de la mission non valide (S+, S, A, B, C)");
  }
  const rank_object = Object.entries(RANKS).find(
    ([key]) => key === mission_rank
  );

  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  if (
    !dateRegex.test(mission_date) ||
    !new Date(mission_date).toISOString().slice(0, 10) === mission_date
  ) {
    throw new BadRequestError(
      "Date de la mission non valide (format YYYY-MM-DD attendu)"
    );
  }

  const mission_update = await MissionRepository.updateMission(mission_id, {
    mission_type,
    mission_location,
    mission_date,
    mission_rank: rank_object,
  });

  return mission_update.dataValues;
}

export async function removeHeroFromMission(hero_id, mission_id) {
  const hero = await getHeroById(hero_id);
  const mission = await getMissionById(mission_id);

  if (!hero || !mission) {
    throw new NotFoundError("Le hero ou la mission n'a pas été trouvé");
  }

  return await MissionRepository.removeHeroFromMission(hero_id, mission_id);
}

// DELETE

export async function deleteMission(mission_id) {
  const mission = await getMissionById(mission_id);

  if (!mission) {
    throw new NotFoundError("La mission n'a pas été trouvé");
  }

  return await MissionRepository.deleteMission(mission_id);
}
