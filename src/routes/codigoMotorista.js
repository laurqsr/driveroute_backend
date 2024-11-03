import express from 'express';
import { cadastrarCodigoMotorista } from '../controllers/codigoMotoristaController.js';

const router = express.Router();

router.post('/codigoMotorista', cadastrarCodigoMotorista);

export default router;