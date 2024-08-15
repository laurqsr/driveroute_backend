import express from 'express';
import MotoristasController from '../controllers/motoristasController.js';

const router = express.Router();

router.post('/motoristas', MotoristasController.inserir);

export default router;