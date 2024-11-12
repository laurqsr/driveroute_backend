import { connection } from '../databases/config.js';
import bcrypt from 'bcrypt';

class PassageirosController {
  async inserir(request, response) {
    try {
      console.log('O que foi recebido: '+request.body);
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

  async login(request, response) {
    try {
      const { email, senha } = request.body;
      const [result] = await connection.query(
        'SELECT * FROM pessoa WHERE email = ? AND perfil = "P"',
        [email]
      );
      if (result.length === 0) {
        return response.status(404).send('Passageiro não encontrado!');
      }
      const passageiro = result[0];
      const senhaValida = bcrypt.compareSync(senha, passageiro.senha);

      if (!senhaValida) {
        return response.status(401).send('Senha incorreta!');
      }
      response.status(200).send('Login realizado com sucesso!'); 
    } catch (error) {
      response.status(500).send(error.message);
    }
  };

  async listar(request, response) {
    try {
      const [result] = await connection.query(
        'SELECT * FROM pessoa WHERE perfil = "P"'
      );

      if (result.length === 0) {
        return response.status(404).send('Nenhum passageiro encontrado!');
      }
      response.status(200).json(result);
    } catch (error) {
      response.status(500).send(error.message);
    }
  };
}

export default new PassageirosController();