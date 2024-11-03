import mysql from 'mysql2/promise';
import config from '../databases/config.js';

export const cadastrarCodigoMotorista = async (request, response) => {
  try {
    const connection = await mysql.createConnection(config);

    const { cod_motorista } = request.body;

    await connection.query(
      'INSERT INTO pessoa (cod_motorista) VALUES (?)',
      [cod_motorista]
    );

    response.status(200).send('Código do motorista cadastrado com sucesso!');
  } catch (error) {
    response.status(500).send('Erro ao cadastrar o código do motorista.');
  }
};