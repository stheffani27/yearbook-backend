import prisma from '../prisma/client.js';

// select que omite senhaHash — reutilizado em todas as queries de alunos
const selectSemSenha = {
  id: true,
  nome: true,
  email: true,
  cidade: true,
  frase: true,
  planosFuturos: true,
  fotoUrl: true,
  role: true,
  criadoEm: true,
  // senhaHash NÃO está aqui — nunca retornado pela API
};

// GET /alunos — lista todos os alunos
export async function listarAlunos(req, res, next) {
  try {
    const alunos = await prisma.aluno.findMany({
      select: selectSemSenha,
    });

    res.json(alunos);
  } catch (erro) {
    next(erro); // Envia o erro inesperado para o middleware global
  }
}

// GET /alunos/:id — busca um aluno pelo ID
export async function buscarAluno(req, res, next) {
  try {
    const { id } = req.params;
    const idNumerico = Number(id);

    // Se o ID não for um número válido
    if (isNaN(idNumerico)) {
      return res.status(404).json({ erro: 'Aluno não encontrado' });
    }

    let aluno = null;

    try {
      aluno = await prisma.aluno.findUnique({
        where: { id: idNumerico },
        select: selectSemSenha,
      });
    } catch (dbError) {
      // Se houver falha na busca por conta do ID, responde 404 em vez de cair no erro 500
      return res.status(404).json({ erro: 'Aluno não encontrado' });
    }

    if (!aluno) {
      return res.status(404).json({ erro: 'Aluno não encontrado' });
    }

    return res.json(aluno);
  } catch (erro) {
    next(erro); // Envia qualquer outro erro para o middleware global
  }
}

// POST /alunos — cria um novo aluno
export async function criarAluno(req, res, next) {
  try {
    const { nome, email, senhaHash, cidade, frase, planosFuturos } = req.body;

    const alunoCriado = await prisma.aluno.create({
      data: {
        nome,
        email,
        senhaHash,
        cidade,
        frase,
        planosFuturos,
      },
      select: selectSemSenha,
    });

    return res.status(201).json(alunoCriado);
  } catch (erro) {
    next(erro); // Envia o erro inesperado para o middleware global
  }
}

// PUT /alunos/:id — atualiza um aluno existente
export async function atualizarAluno(req, res, next) {
  const { id } = req.params;
  const dados = req.body;

  try {
    const alunoAtualizado = await prisma.aluno.update({
      where: {
        id: Number(id),
      },
      data: dados,
      select: selectSemSenha,
    });

    return res.status(200).json(alunoAtualizado);
  } catch (error) {
    return res.status(404).json({
      erro: 'Aluno não encontrado',
    });
  }
}

// DELETE /alunos/:id — deleta um aluno
export async function deletarAluno(req, res, next) {
  const { id } = req.params;

  try {
    await prisma.aluno.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(204).end();
  } catch (error) {
    return res.status(404).json({
      erro: 'Aluno não encontrado',
    });
  }
}