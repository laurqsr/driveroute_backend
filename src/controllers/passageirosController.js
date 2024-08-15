import { connection } from '../databases/config.js';
import bcrypt from 'bcrypt';

class PassageirosController {
  async inserir(request, response) {
    try {  
      const { nome, sobrenome, senha, email } = request.body;

      const senhaPassageiro = bcrypt.hashSync(senha, 10);
  
      await connection.query(
        'INSERT INTO pessoa (nome, sobrenome, senha, email, perfil) VALUES (?, ?, ?, ?, ?)',
        [nome, sobrenome, senhaPassageiro, email, "P"]
      );
      response.status(201).send('Cadastro de passageiro realizado com sucesso!');
    } catch (error) {
      response.status(500).send(error.message);
    }
  };
}

export default new PassageirosController();