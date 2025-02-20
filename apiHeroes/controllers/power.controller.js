import { PowerService } from '../services/power.service.js';

// CREATE
export async function createPower(req, res, next) {
    try {
        const { power_label } = req.body;
        const newPower = await PowerService.createPower({
            power_label,
        });
        res.json(newPower);
    } catch (error) {
        next(error)
    }
}

export async function getPowerById(req, res, next) {
    try {
        const id = req.params.id;
        const power = await PowerService.getPowerById(id);
        res.json(power);
    } catch (error) {
        next(error)
    }
}

export async function getPowerByLabel(req, res, next) {
    try {
        const label = req.params.label;
        const power = await PowerService.getPowerByLabel(label);
        res.json(power);
    } catch (error) {
        next(error)
    }
}

export async function getDeletedPowerById(req, res, next) {
    try {
        const id = req.params.id;
        const power = await PowerService.getDeletedPowerById(id);
        res.json(power);
    } catch (error) {
        next(error)
    }
}

export async function getAllPowers(req, res, next) {
    try {
        const powers = await PowerService.getAllPowers();
        res.json(powers);
    } catch (error) {
        next(error)
    }
}

export async function getAllPowersDeleted(req, res, next) {
    try {
        const powers = await PowerService.getAllPowersDeleted();
        res.json(powers);
    } catch (error) {
        next(error)
    }
}

// UPDATE 
export async function updatePower(req, res, next) {
    try {
        const id = req.params.id;
        const { power_label } = req.body;
        const updatedPower = await PowerService.updatePower(id, {
            power_label,
        });
        res.json(updatedPower);
    } catch (error) {
        next(error)
    }
}

export async function restorePower(req, res, next) {
    try {
        const id = req.params.id;
        const restoredPower = await PowerService.restorePower(id);
        res.json(restoredPower);
    } catch (error) {
        next(error)
    }
}

// DELETE 
export async function deletePower(req, res, next) {
    try {
        const id = req.params.id;
        const deletedPower = await PowerService.deletePower(id);
        res.json(deletedPower);
    } catch (error) {
        next(error)
    }
}