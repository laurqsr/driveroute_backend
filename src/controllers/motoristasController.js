import { connection } from '../databases/config.js';
import bcrypt from 'bcrypt';

class MotoristasController {

 async inserir(request, response) {
  try {
    console.log('O que foi recebido: ', request.body);
    const { nome, sobrenome, senha, email } = request.body;
    const senhaMotorista = bcrypt.hashSync(senha, 10);

    const [result] = await connection.query(
      'INSERT INTO pessoa (nome, sobrenome, email, senha, perfil) VALUES (?, ?, ?, ?, ?)',
      [nome, sobrenome, email, senhaMotorista, "M"]
    );

    const motoristaId = result.insertId; 
    response.status(201).json({ message: 'Cadastro realizado com sucesso!', id: motoristaId });
  } catch (error) {
    response.status(500).send(error.message);
  }
}

async login(request, response) {
  try {
    const { email, senha } = request.body;

    if (!email || !senha) {
      return response.status(400).json({ message: 'Email e senha são obrigatórios!' });
    }

    const [result] = await connection.query(
      'SELECT * FROM pessoa WHERE email = ? AND perfil = "M"',
      [email]
    );

    if (result.length === 0) {
      return response.status(404).json({ message: 'Os campos não coincidem. Tente mudar o e-mail ou a senha!' });
    }

    const motorista = result[0];
    const senhaValida = bcrypt.compareSync(senha, motorista.senha);

    if (!senhaValida) {
      return response.status(401).json({ message: 'Senha incorreta!' });
    }

    response.status(200).json({
      id: motorista.id_pessoa,
      nome: motorista.nome,
      email: motorista.email,
    });
  } catch (error) {
    console.error('Erro no login:', error.message);
    response.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
  }
}

  

  async atualizar(request, response) {
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
      const [result] = await connection.query(
        'SELECT * FROM pessoa WHERE perfil = "M"'
      );  
      if (result.length === 0) {
        return response.status(404).send('Nenhum motorista encontrado!');
      }
      response.status(200).json(result);      
    } catch (error) {
      response.status(500).send(error.message);
    }
  };

  ///////
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