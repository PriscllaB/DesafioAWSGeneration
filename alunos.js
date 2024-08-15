const express = require("express");
const cors = require('cors') // permite integração com o frontend
const conectaBancoDeDados = require('./bancoDeDados') // conectando o banco de dados
conectaBancoDeDados() // estou chamando a função que conecta o banco de dados

const Aluno = require('./alunosModel')
const app = express();
const porta = 3333;

// Middleware para parsear o corpo da requisição como JSON
app.use(express.json());
app.use(cors())

// GET
async function mostraAlunos(request, response) {
  try {
    const alunosVindosDoBancoDeDados = await Aluno.find()
    response.json(alunosVindosDoBancoDeDados)
  } catch (erro) {
    console.log(erro)
  }
}

// POST
async function criaAluno(request, response) {
  const novoAluno = new Aluno({
    id: request.body.id,
    nome: request.body.nome,
    idade: request.body.idade,
    notaPrimeiroSemeste: request.body.notaPrimeiroSemeste,
    notaSegundoSemestre: request.body.notaSegundoSemestre,
    nomeProfessor: request.body.nomeProfessor,
    numeroDaSala: request.body.numeroDaSala
  });

  try {
    const alunoCriado = await novoAluno.save()
    response.status(201).json(alunoCriado)
  } catch (erro) {
    console.log(erro)
  }
}

// PATCH
async function corrigeAluno(request, response) {
  try {
    const alunoEncontrado = await Aluno.findById(request.params.id)


    if (request.body.id) {
        alunoEncontrado.id = request.body.id
      }
    if (request.body.nome) {
      alunoEncontrado.nome = request.body.nome
    }
    if (request.body.idade) {
      alunoEncontrado.idade = request.body.idade
    }
    if (request.body.notaPrimeiroSemeste) {
      alunoEncontrado.notaPrimeiroSemeste = request.body.notaPrimeiroSemeste
    }
    if (request.body.notaSegundoSemestre) {
      alunoEncontrado.notaSegundoSemestre = request.body.notaSegundoSemestre
    }
    if (request.body.nomeProfessor) {
        alunoEncontrado.nomeProfessor = request.body.nomeProfessor
    }
    if (request.body.numeroDaSala) {
        alunoEncontrado.numeroDaSala = request.body.numeroDaSala
    }

    const alunoAtualizadoNoBancoDeDados = await alunoEncontrado.save()

    response.json(alunoAtualizadoNoBancoDeDados)

  } catch (erro) {
    console.log(erro)
  }
}

// DELETE
async function deletaAluno(request, response) {
  try {
    await Aluno.findByIdAndDelete(request.params.id)
    response.json({ mensagem: 'Aluno deletado com sucesso!' })
  } catch (erro) {
    console.log(erro)
  }
}

// Configurando as rotas
app.get('/alunos', mostraAlunos); // rota GET /alunos
app.post('/alunos', criaAluno); // rota POST /alunos
app.patch('/alunos/:id', corrigeAluno) // rota PATCH /alunos/:id
app.delete('/alunos/:id', deletaAluno) // rota DELETE /alunos/:id

// Iniciando o servidor
app.listen(porta, () => {
  console.log("Servidor criado e rodando na porta", porta);
});