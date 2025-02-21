import express from 'express';
import { PowerController } from '../controllers/index.controller.js';

const powers_router = express.Router()

powers_router.get('/powers/', PowerController.getAllPowers);
powers_router.get('/powers/:id', PowerController.getPowerById);
powers_router.post('/powers/', PowerController.createPower);
powers_router.put('/powers/:id', PowerController.updatePower);
powers_router.delete('/powers/:id', PowerController.deletePower); 

powers_router.patch('/:id/restore', PowerController.restorePower)

export default powers_router;