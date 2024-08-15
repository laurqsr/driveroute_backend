import express from 'express';
import MotoristasController from '../controllers/motoristasController.js';
import PassageirosController from '../controllers/passageirosController.js'

const router = express.Router();

router.post('/motoristas', MotoristasController.inserir);
router.put('/motoristas', MotoristasController.atualizar);
router.post('/passageiros', PassageirosController.inserir);

export default router;