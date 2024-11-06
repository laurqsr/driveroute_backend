
import mysql from 'mysql2/promise';

export const connection = mysql.createPool({
  host: 'mysql.infocimol.com.br',
  user: 'infocimol21',
  password: 'Drive1Route',
  database: 'infocimol21',
  port: '3306'
});

if (connection)
console.log('Conexão estabelecida com sucesso!');
else
console.log('Erro ao conectar com o banco de dados!');
