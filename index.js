import express from 'express';
import logger from './middlewares/logger.js';
import alunosRouter from './routes/alunos.js';

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json()); // interpreta JSON enviado no body
app.use(logger); // registra um log para cada requisição

// Rota raiz
app.get('/', (req, res) => {
  res.json({ mensagem: 'Yearbook API está no ar! 🎓' });
});

// Rota de status
app.get('/status', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
  });
});

// Rotas de alunos
app.use('/alunos', alunosRouter);

// Inicia o servidor localmente
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

// Exporta o app para a Vercel
export default app;