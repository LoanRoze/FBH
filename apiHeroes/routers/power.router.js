import express from 'express';
import { PowerController } from '../controllers/power.controller.js';

const router = express.Router()

router.get('/', PowerController.getAllPowers);
router.get('/:id', PowerController.getPowerById);
router.post('/', PowerController.createPower);
router.put('/:id', PowerController.updatePower);
router.delete('/:id', PowerController.deletePower); 

router.patch('/:id/restore', PowerController.restorePower)

export default router;