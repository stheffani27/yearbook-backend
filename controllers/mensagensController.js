import prisma from '../prisma/client.js'; // importa o singleton do Prisma

// GET /mensagens — lista todas as mensagens (mais recentes primeiro, com dados do autor)
export async function listarMensagens(req, res) {
  const mensagens = await prisma.mensagem.findMany({
    orderBy: { criadoEm: 'desc' },  // mais recente primeiro
    include: {
      autor: {                        // traz dados do autor junto
        select: {
          nome: true,                 // nome do autor
          fotoUrl: true,              // foto do autor
        },
      },
    },
  });
  res.json(mensagens); // retorna a lista com autor embutido
}

// 🎯 POST /mensagens — cria uma nova mensagem
export async function criarMensagem(req, res) {
  try {
    // 1. Extraia texto, imagemUrl e autorId de req.body
    const { texto, imagemUrl, autorId } = req.body;

    // 2. Valide: se texto não existir ou for vazio, retorne 400
    if (!texto || texto.trim() === '') {
      return res.status(400).json({ erro: "O campo 'texto' é obrigatório." });
    }

    // Atenção: Garantir que o autorId seja um número inteiro
    const autorIdNumero = Number(autorId);
    if (isNaN(autorIdNumero)) {
      return res.status(400).json({ erro: "O campo 'autorId' deve ser um número válido." });
    }

    // 3. Crie com prisma.mensagem.create()
    const novaMensagem = await prisma.mensagem.create({
      data: {
        texto,
        imagemUrl,
        autorId: autorIdNumero
      }
    });

    // 4. Retorne 201 com a mensagem criada
    return res.status(201).json(novaMensagem);

  } catch (error) {
    console.error("Erro ao criar mensagem:", error);
    return res.status(500).json({ erro: "Não foi possível criar a mensagem." });
  }
}

// 🎯 DELETE /mensagens/:id — deleta uma mensagem
export async function deletarMensagem(req, res) {
  try {
    // 1. Extrai o ID dos parâmetros da URL (/mensagens/:id)
    const { id } = req.params;

    // ⚠️ Importante: Converte o ID recebido como string para número inteiro
    const idNumero = Number(id);
    if (isNaN(idNumero)) {
      return res.status(400).json({ erro: "ID inválido." });
    }

    // 2. Verifica se a mensagem de fato existe no banco de dados
    const mensagemExistente = await prisma.mensagem.findUnique({
      where: { id: idNumero }
    });

    // Se a mensagem não existir, corta a execução e retorna 404
    if (!mensagemExistente) {
      return res.status(404).json({ erro: "Mensagem não encontrada." });
    }

    // 3. Caso exista, manda o Prisma deletar do banco
    await prisma.mensagem.delete({
      where: { id: idNumero }
    });

    // 4. Retorna o status 204 (Sucesso sem corpo de resposta)
    return res.status(204).send();

  } catch (error) {
    console.error("Erro ao deletar mensagem:", error);
    return res.status(500).json({ erro: "Não foi possível deletar a mensagem." });
  }
}