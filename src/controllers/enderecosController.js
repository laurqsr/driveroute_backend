import { connection } from '../databases/config.js';
import bcrypt from 'bcrypt';

class EnderecosController {

  async inserir(request, response) {
    try {
      console.log('O que foi recebido: ' + request.body);
      const { nome, email, cidade, bairro, rua, numero } = request.body;
      
      // Inserção do endereço na tabela
      await connection.query(
        'INSERT INTO enderecos (nome, email, cidade, bairro, rua, numero) VALUES (?, ?, ?, ?, ?, ?)',
        [nome, email, cidade, bairro, rua, numero]
      );
  
      // Resposta de sucesso
      response.status(201).send('Endereço cadastrado com sucesso!');
    } catch (error) {
      // Tratamento de erro
      response.status(500).send(error.message);
    }
  };

  async listar(request, response) {
    try {
      const [result] = await connection.query(
        'SELECT * FROM enderecos'  // Selecionando todos os registros da tabela 'enderecos'
      );
  
      if (result.length === 0) {
        return response.status(404).send('Nenhum endereço encontrado!');
      }
  
      response.status(200).json(result);  // Retorna os endereços em formato JSON
    } catch (error) {
      response.status(500).send(error.message);  // Retorna o erro caso haja algum problema
    }
  };

  async listarEscolas(request, response) {
    try {
      const [result] = await connection.query(
        'SELECT * FROM enderecos WHERE escola = "S"'  // Filtrando os registros onde 'escola' é igual a 'S'
      );
  
      if (result.length === 0) {
        return response.status(404).send('Nenhuma escola encontrada!');
      }
  
      response.status(200).json(result);  // Retorna os endereços das escolas em formato JSON
    } catch (error) {
      response.status(500).send(error.message);  // Retorna o erro caso haja algum problema
    }
  }
  
  
  

}

export default new EnderecosController();