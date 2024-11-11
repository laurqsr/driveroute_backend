import express from 'express';
import MotoristasController from '../controllers/motoristasController.js';
import PassageirosController from '../controllers/passageirosController.js'


const router = express.Router();

//ROTA BASE
router.get('/', (req, res) => {
    res.send('API em execução');//funciona
});

//ROTA TESTE BANCO DE DADOS
router.get('/ping', MotoristasController.ping);//funciona


//ROTAS MOTORISTAS
router.post('/motoristas/new', MotoristasController.inserir);//funciona
router.post('/motoristas/login', MotoristasController.login);
router.put('/motoristas/update', MotoristasController.atualizar);//naoo funciona
router.get('/motoristas/listar', MotoristasController.listar);//aparece errado ? precisa funcionar

//ROTAS PASSAGEIROS
router.post('/passageiros', PassageirosController.inserir);

export default router;