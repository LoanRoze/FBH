import { format } from "sequelize/lib/utils";
import {
    ConflictError,
    BadRequestError,
    NotFoundError,
} from "../errors/api.error.js";
import { PowerRepository } from "../repositories/index.repository.js";

// CREATE
export async function createPower({power_label}) {    
    if (power_label.length < 3 || !/^[a-zA-Z ]+$/.test(power_label)) {
        throw new BadRequestError("Libellé du pouvoir non valide (3 caractères min et caractères spéciaux interdits).")
    }
    if (power_label === null) {
        return null
    }

    if (await PowerRepository.powerExists(power_label)) {        
        return await getPowerByLabel(power_label)
    } else {
        const power = await PowerRepository.createPower({ power_label })
        
        return power.dataValues
    }
}

// READ
export async function getPowerById(power_id) {
    const power = await PowerRepository.getPowerById(power_id)

    if (!power) {
        throw new NotFoundError("Le pouvoir n'a pas été trouvé");
    }

    return {
        power_id: power.power_id,
        power_label: power.power_label,
    }
}

export async function getPowerByLabel(power_label) {
    const power = await PowerRepository.getPowerByLabel(power_label)

    if (!power) {
        throw new NotFoundError("Le pouvoir n'a pas été trouvé");
    }

    return {
        power_id: power.power_id,
        power_label: power.power_label,
    }
}

export async function getDeletedPowerById(power_id) {
    const power = await PowerRepository.getDeletedPowerById(power_id)

    if (!power) {
        throw new NotFoundError("Le pouvoir n'a pas été trouvé");
    }

    return {
        power_id: power.power_id,
        power_label: power.power_label,
    }
}

export async function getAllPowers() {
    const powers = await PowerRepository.getAllPowers()

    const formattedPowers = powers.map((power) => {
        return {
            power_id : power.power_id,
            power_label : power.power_label,
        }
    })
    return formattedPowers
}

export async function getAllPowersDeleted() {
    const powers = await PowerRepository.getAllPowersDeleted()

    const formattedPowers = powers.map((power) => {
        return {
            power_id : power.power_id,
            power_label : power.power_label,
        }
    })
    return formattedPowers
}


// UPDATE

export async function updatePower(power_id, {power_label}) {
    if (power_label.length < 3 || !/^[a-zA-Z ]+$/.test(power_label)) {
        throw new BadRequestError("Libellé du pouvoir non valide (3 caractères min et caractères spéciaux interdits).")
    }
    if (power_label === null) {
        return null
    }

    if (await PowerRepository.powerExists(power_label)) {
        return PowerRepository.getPowerByLabel(power_label).dataValues
    } else {
        const power = await PowerRepository.updatePower(power_id, { power_label })
        
        return power.dataValues
    }
}

export async function restorePower(power_id) {
    const restoredPower = await PowerRepository.restorePower(power_id);

    if(!restoredPower) {
        throw new NotFoundError(
          "Le pouvoir n'existe pas. Le pouvoir ne peut pas être restauré."
        );
      }
    
      if (await PowerRepository.powerExists(restoredHero.power_label)) {
        throw new ConflictError("Le label du pouvoir existe déjà. Le pouvoir ne peut pas être restauré.")
      }
    
      return restoredPower;
}

// DELETE

export async function deletePower(power_id) {
  if (!(await getPowerById(power_id))) {
    throw new NotFoundError("Le pouvoir n'existe pas.");
  }

  return await PowerRepository.deletePower(power_id);
}