import { connection } from '../databases/config.js';
import bcrypt from 'bcrypt';

class MotoristasController {
  async inserir(request, response) {
    try {
      console.log(request.body);
      const { nome, sobrenome, senha, email } = request.body;

      const senhaMotorista = bcrypt.hashSync(senha, 10);
  
      await connection.query(
        'INSERT INTO pessoa (nome, sobrenome, senha, email, perfil) VALUES (?, ?, ?, ?, ?)',
        [nome, sobrenome, senhaMotorista, email, "M"]
      );
      response.status(201).send('Cadastro de motorista realizado com sucesso!');
    } catch (error) {
      response.status(500).send(error.message);
    }
  };

  async atualizar(request, response) {//naooo funciona
    try {  
      const { nome, sobrenome, senha, email } = request.body;

      const senhaMotorista = bcrypt.hashSync(senha, 10);
  
      await connection.query(
        'UPDATE pessoa SET (nome, sobrenome, senha, email, perfil) VALUES (?, ?, ?, ?, ?)',
        [nome, sobrenome, senhaMotorista, email, "M"]
      );
      response.status(201).send('Sucesso!');
    } catch (error) {
      response.status(500).send(error.message);
    }
  };
}

export default new MotoristasController();