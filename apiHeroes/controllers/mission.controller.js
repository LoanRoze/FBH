import { MissionService } from "../services/mission.service.js";

// CREATE
export async function createMission(req, res, next) {
    try {
        const { mission_type, mission_location, mission_date, mission_rank } = req.body;
        const newMission = await MissionService.createMission({
            mission_type,
            mission_location,
            mission_date,
            mission_rank,
        });
        res.json(newMission);
    } catch (error) {
        next(error)
    }
}

export async function assignHeroToMission(req, res, next) {
    try {
        const { hero_id, mission_id } = req.body;
        const mission_hero = await MissionService.assignHeroToMission(hero_id, mission_id);
        res.json(mission_hero);
    } catch (error) {
        next(error)
    }
}

export async function assignHeroesToMission(req, res, next) {
    try {
        const { heroes_id, mission_id } = req.body;
        const mission_hero = await MissionService.assignHeroesToMission(heroes_id, mission_id);
        res.json(mission_hero);
    } catch (error) {
        next(error)
    }
}

// READ
export async function getMissionById(req, res, next) {
    try {
        const id = req.params.id;
        const mission = await MissionService.getMissionById(id);
        res.json(mission);
    } catch (error) {
        next(error)
    }
}

export async function getMissionHeroId(req, res, next) {
    try {
        const { hero_id, mission_id } = req.body;
        const mission_hero = await MissionService.getMissionHeroId(hero_id, mission_id);
        res.json(mission_hero);
    } catch (error) {
        next(error)
    }
}

export async function getAllMissions(req, res, next) {
    try {
        const missions = await MissionService.getAllMissions();
        res.json(missions);
    } catch (error) {
        next(error)
    }
}

export async function getMissionsDeleted(req, res, next) {
    try {
        const missions = await MissionService.getMissionsDeleted();
        res.json(missions);
    } catch (error) {
        next(error)
    }
}

// UPDATE
export async function updateMission(req, res, next) {
    try {
        const id = req.params.id;
        const { mission_type, mission_location, mission_date, mission_rank } = req.body;
        const updatedMission = await MissionService.updateMission(id, {
            mission_type,
            mission_location,
            mission_date,
            mission_rank,
        });
        res.json(updatedMission);
    } catch (error) {
        next(error)
    }
}

export async function removeHeroFromMission(req, res, next) {
    try {
        const { hero_id, mission_id } = req.body;
        const removedHero = await MissionService.removeHeroFromMission(hero_id, mission_id);
        res.json(removedHero);
    } catch (error) {
        next(error)
    }
}

export async function deleteMission(req, res, next) {
    try {
        const id = req.params.id;
        const deletedMission = await MissionService.deleteMission(id);
        res.json(deletedMission);
    } catch (error) {
        next(error)
    }
}