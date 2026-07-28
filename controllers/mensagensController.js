import prisma from '../prisma/client.js';

// GET /mensagens — lista todas as mensagens
export async function listarMensagens(req, res, next) {
  try {
    const mensagens = await prisma.mensagem.findMany({
      include: {
        autor: {
          select: {
            id: true,
            nome: true,
            fotoUrl: true,
          },
        },
      },
    });

    res.json(mensagens);
  } catch (erro) {
    next(erro); // Envia erros inesperados para o middleware global de erro
  }
}

// POST /mensagens — cria uma nova mensagem
export async function criarMensagem(req, res, next) {
  try {
    const { texto, autorId } = req.body;

    // Validação de campo obrigatório (Erro de regra de negócio - Status 400)
    if (!texto) {
      return res.status(400).json({ erro: 'O campo texto é obrigatório' });
    }

    const mensagemCriada = await prisma.mensagem.create({
      data: {
        texto,
        autorId: Number(autorId),
      },
      include: {
        autor: {
          select: {
            id: true,
            nome: true,
            fotoUrl: true,
          },
        },
      },
    });

    return res.status(201).json(mensagemCriada);
  } catch (erro) {
    next(erro); // Envia erros inesperados para o middleware global de erro
  }
}

// DELETE /mensagens/:id — deleta uma mensagem
export async function deletarMensagem(req, res, next) {
  const { id } = req.params;

  try {
    await prisma.mensagem.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(204).end();
  } catch (erro) {
    // Trata o erro de mensagem não encontrada com 404
    return res.status(404).json({
      erro: 'Mensagem não encontrada',
    });
  }
}