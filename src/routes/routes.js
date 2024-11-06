import express from 'express';
import MotoristasController from '../controllers/motoristasController.js';
import PassageirosController from '../controllers/passageirosController.js'


const router = express.Router();

//ROTA BASE
router.get('/', (req, res) => {
    res.send('API em execução');
});

//ROTA TESTE BANCO DE DADOS
router.get('/ping', MotoristasController.ping);


//ROTAS MOTORISTAS
router.post('/motoristas', MotoristasController.inserir);
router.put('/motoristas/update', MotoristasController.atualizar);

//ROTAS PASSAGEIROS
router.post('/passageiros', PassageirosController.inserir);
router.get('/lista-motoristas', MotoristasController.listar);




export default router;