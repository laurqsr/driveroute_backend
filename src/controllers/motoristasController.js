import { connection } from '../databases/config.js';
import bcrypt from 'bcrypt';

class MotoristasController {

  async inserir(request, response) {
    try {
      console.log('O que foi recebido: '+request.body);
   
      const { nome, sobrenome, senha, email } = request.body;

      const senhaMotorista = bcrypt.hashSync(senha, 10);
  
      await connection.query(
        'INSERT INTO pessoa (nome, sobrenome, senha, perfil, email) VALUES (?, ?, ?, ?, ?)',
        [nome, sobrenome, senhaMotorista, email, "M"]
      );
      response.status(201).send('Cadastro de motorista realizado com sucesso!');

    } catch (error) {
      response.status(500).send(error.message);
    }
  };

  async atualizar(request, response) {//naooo funciona
    try {  
     
      const senhaMotorista = bcrypt.hashSync(senha, 10);
  
      const { nome, sobrenome, senha, email } = request.body;

      await connection.query(
        'UPDATE pessoa SET nome = ?, sobrenome = ?, senha = ?, email = ? WHERE id = ? AND perfil = "M"',
        [nome, sobrenome, senhaMotorista, email, request.params.id]
      );
      response.status(201).send('Sucesso!');
    } catch (error) {
      response.status(500).send(error.message);
    }
  };

  async listar(request, response) {
    try {

      const motoristas = await connection.query(
        'SELECT * FROM pessoa p WHERE p.perfil = "M"'
      );
      response.status(201).send(motoristas);
    } catch (error) {
      response.status(500).send(error.message);
    }
  };

  async ping(req, res) {
    try {
      const [e] = await connection.query('SELECT 1');
      res.status(200).json('Banco de dados Respondendo OK'); 
    } catch (error) {
      res.status(500).send(error.message); 
    }
  }

}

export default new MotoristasController();