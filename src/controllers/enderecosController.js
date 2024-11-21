import { connection } from '../databases/config.js';
import bcrypt from 'bcrypt';

class EnderecosController {

  async inserir(request, response) {
    try {
      console.log('O que foi recebido: ', request.body);
      const { nome, email, cidade, bairro, rua, numero, motorista } = request.body;
  
      if (!nome || !email || !cidade || !bairro || !rua || !numero || !motorista) {
        return response.status(400).send('Todos os campos são obrigatórios.');
      }
  
      console.log('Dados para inserção:', nome, email, cidade, bairro, rua, numero, motorista);
  
      // Comando SQL para inserção
      await connection.query(
        'INSERT INTO enderecos (nome, email, cidade, bairro, rua, numero, motorista) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [nome, email, cidade, bairro, rua, numero, motorista]
      );
  
      response.status(201).send('Endereço cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao inserir endereço:', error.message);
      response.status(500).send('Erro no servidor: ' + error.message);
    }
  }
  
  
  async listar(request, response) {
    try {
      const { motoristaId } = request.query; 
  
      let query = 'SELECT * FROM enderecos';
      let params = [];
  

      if (motoristaId) {
        query += ' WHERE motorista = ?';
        params.push(motoristaId);
      }
  
      const [result] = await connection.query(query, params); 
  
      response.status(200).json(result);
    } catch (error) {
      response.status(500).send(error.message);
    }
  }
  

  async listarEscolas(request, response) {
    try {
      const [result] = await connection.query(
        'SELECT * FROM enderecos WHERE escola = "S"' 
      );
  
      if (result.length === 0) {
        return response.status(404).send('Nenhuma escola encontrada!');
      }
  
      response.status(200).json(result);
    } catch (error) {
      response.status(500).send(error.message); 
    }
  }
  
  
  

}

export default new EnderecosController();