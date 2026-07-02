// Middleware de log — registra cada requisição no terminal
export default function logger(req, res, next) {
  const inicio = Date.now(); // 1. Marca o milissegundo exato em que a requisição chegou

  // 2. Inscreve um "ouvinte" para o evento de finalização da resposta
  res.on('finish', () => { 
    const duracao = Date.now() - inicio;    // 3. Calcula a diferença de tempo
    const agora = new Date().toISOString(); // 4. Cria o timestamp atual

    // 5. Exibe a linha formatada no terminal
    console.log(`[${agora}] ${req.method} ${req.originalUrl} → ${res.statusCode} (${duracao}ms)`);
  });

  next();
}