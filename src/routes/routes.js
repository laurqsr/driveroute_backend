import express from 'express';
import MotoristasController from '../controllers/motoristasController.js';
import PassageirosController from '../controllers/passageirosController.js'
import enderecosController from '../controllers/enderecosController.js';
// import enderecosController from '../controllers/enderecosController.js';


const router = express.Router();

//ROTA BASE
router.get('/', (req, res) => {
    res.send('API em execução');//funciona
});

//ROTA TESTE BANCO DE DADOS PASSAR P OUTRO CONTROLLER
router.get('/ping', MotoristasController.ping);//funciona


//ROTAS MOTORISTAS
router.post('/motoristas/new', MotoristasController.inserir);//funciona
router.post('/motoristas/login', MotoristasController.login);//funciona
router.put('/motoristas/update', MotoristasController.atualizar);//naoo funciona e nao precisa agora
router.get('/motoristas/listar', MotoristasController.listar);//funciona

//ROTAS PASSAGEIROS
router.post('/passageiros/new', PassageirosController.inserir);//funciona
router.post('/passageiros/login', PassageirosController.login);//funciona
router.get('/passageiros/listar', PassageirosController.listar);//funciona

router.post('/enderecos/new', enderecosController.inserir);//funciona
router.get('/enderecos/listar', enderecosController.listar);//funciona
router.get('/escolas/listar', enderecosController.listarEscolas);//funciona

export default router;