// import { connection } from '../databases/config.js';
// import bcrypt from 'bcrypt';

// class EnderecosController {

//   // Método para cadastrar endereço
//   async inserir(request, response) {
//     const { cidade, bairro, rua, numero, complemento, descricao, escola, Pessoa_id_pessoa } = req.body;

//     try {
//         // Verificar se o id_pessoa existe na tabela pessoa
//         const [rows] = await db.execute('SELECT id_pessoa FROM pessoa WHERE id_pessoa = ?', [Pessoa_id_pessoa]);

//         if (rows.length === 0) {
//             return res.status(400).json({ error: 'Pessoa não encontrada' });
//         }

//         // Inserir o novo endereço
//         await db.execute(
//             'INSERT INTO endereco (cidade, bairro, rua, numero, complemento, descricao, escola, Pessoa_id_pessoa) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
//             [cidade, bairro, rua, numero, complemento, descricao, escola, Pessoa_id_pessoa]
//         );

//         return res.status(201).json({ message: 'Endereço cadastrado com sucesso' });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Erro ao cadastrar endereço' });
//     }
// };

// }

// export default new EnderecosController();