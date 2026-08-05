# API do Yearbook — Documentação de Endpoints

Base URL (produção): `https://yearbook-backend.vercel.app`

## CORS

Esta API tem CORS habilitado para qualquer origem. Você pode consumi-la
de qualquer domínio (localhost, Vercel, etc.) sem configuração adicional
no cliente.

## Convenções

- Todas as respostas são em JSON
- Rotas protegidas exigem header `Authorization: Bearer <token>`
- O campo `senhaHash` nunca é retornado em nenhuma resposta
- Erros seguem o formato `{ "erro": "mensagem descritiva" }`

## Auth
## Alunos

### GET /alunos

Lista todos os alunos.

- **Autenticação:** Não
- **Body:** Nenhum

- **Resposta de sucesso:** `200 OK`

```json
[
  {
    "id": 1,
    "nome": "Maria Silva",
    "email": "maria@email.com",
    "cidade": "Salinas",
    "frase": "Aqui começa o futuro.",
    "planosFuturos": "Cursar Ciência da Computação na UFMG",
    "fotoUrl": null,
    "role": "USER",
    "criadoEm": "2026-04-03T10:30:00.000Z"
  }
]
```

- **Erros:** Nenhum

### GET /alunos/:id

Busca um aluno pelo ID.

- **Autenticação:** Não
- **Body:** Nenhum

- **Resposta de sucesso:** `200 OK`

```json
{
  "id": 1,
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "cidade": "Salinas",
  "frase": "Aqui começa o futuro.",
  "planosFuturos": "Cursar Ciência da Computação na UFMG",
  "fotoUrl": null,
  "role": "USER",
  "criadoEm": "2026-04-03T10:30:00.000Z"
}
```

- **Erros:**
  - `404` — Aluno não encontrado

### PUT /alunos/:id

Atualiza o próprio perfil.

- **Autenticação:** Bearer token

- **Body:**

```json
{
  "nome": "Maria Silva",
  "cidade": "Salinas",
  "frase": "Nova frase",
  "planosFuturos": "Entrar na UFMG",
  "fotoUrl": "https://imagem.com/foto.jpg"
}
```

- **Resposta de sucesso:** `200 OK`

```json
{
  "mensagem": "Perfil atualizado com sucesso"
}
```

- **Erros:**
  - `401` — Não autenticado
  - `403` — Sem permissão

### DELETE /alunos/:id

Remove um aluno.

- **Autenticação:** Bearer token (admin)
- **Body:** Nenhum

- **Resposta de sucesso:** `204 No Content`

- **Erros:**
  - `401` — Não autenticado
  - `403` — Apenas admin pode excluir

## Mensagens

### GET /mensagens

Lista todas as mensagens do mural.

- **Autenticação:** Não
- **Body:** Nenhum

- **Resposta de sucesso:** `200 OK`

```json
[
  {
    "id": 1,
    "texto": "Muito sucesso para todos!",
    "imagemUrl": null,
    "autorId": 1,
    "autor": {
      "id": 1,
      "nome": "Maria Silva",
      "fotoUrl": null
    }
  }
]
```

- **Erros:** Nenhum

### POST /mensagens

Cria uma nova mensagem.

- **Autenticação:** Bearer token

- **Body:**

```json
{
  "texto": "Muito sucesso para todos!",
  "imagemUrl": "https://imagem.com/post.jpg"
}
```

- **Resposta de sucesso:** `201 Created`

```json
{
  "mensagem": "Mensagem criada com sucesso"
}
```

- **Erros:**
  - `400` — Texto obrigatório
  - `401` — Não autenticado

### DELETE /mensagens/:id

Exclui uma mensagem.

- **Autenticação:** Bearer token
- **Body:** Nenhum

- **Resposta de sucesso:** `204 No Content`

- **Erros:**
  - `401` — Não autenticado
  - `403` — Sem permissão

### POST /auth/register

Cria uma nova conta de aluno.

- **Autenticação:** Não
- **Body:**

```json
{
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "senha": "minhasenha123",
  "cidade": "Salinas",
  "frase": "Aqui começa o futuro.",
  "planosFuturos": "Cursar Ciência da Computação na UFMG"
}
```

- **Resposta de sucesso:** `201 Created`

```json
{
  "id": 1,
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "cidade": "Salinas",
  "frase": "Aqui começa o futuro.",
  "planosFuturos": "Cursar Ciência da Computação na UFMG",
  "fotoUrl": null,
  "role": "USER",
  "criadoEm": "2026-04-03T10:30:00.000Z"
}
```

- **Erros:**
  - `400` — Campos obrigatórios ausentes
  - `409` — Email já cadastrado

### POST /auth/login

Autentica um aluno e retorna um token JWT.

- **Autenticação:** Não
- **Body:**

```json
{
  "email": "maria@email.com",
  "senha": "minhasenha123"
}
```

- **Resposta de sucesso:** `200 OK`

```json
{
  "token": "eyJhbGciOiJIUzI1Ni..."
}
```

- **Erros:**
  - `401` — Credenciais inválidas

## Alunos

### GET /alunos

Lista todos os alunos.

- **Autenticação:** Não
- **Body:** Não possui

### GET /alunos/:id

Busca um aluno pelo ID.

- **Autenticação:** Não
- **Body:** Não possui

- **Erros:**
  - `404` — Aluno não encontrado

### PUT /alunos/:id

Atualiza o próprio perfil.

- **Autenticação:** Bearer token

- **Body:**

```json
{
  "nome": "Maria Silva",
  "cidade": "Salinas",
  "frase": "Meu novo lema",
  "planosFuturos": "Entrar na faculdade",
  "fotoUrl": "https://imagem.com/foto.jpg"
}
```

- **Erros:**
  - `401` — Não autenticado
  - `403` — Sem permissão

### DELETE /alunos/:id

Remove um aluno.

- **Autenticação:** Bearer token (admin)
- **Body:** Não possui

- **Resposta de sucesso:** `204 No Content`

- **Erros:**
  - `401` — Não autenticado
  - `403` — Apenas admin pode excluir

## Mensagens

### GET /mensagens

Lista todas as mensagens do mural.

- **Autenticação:** Não
- **Body:** Não possui

### POST /mensagens

Cria uma nova mensagem.

- **Autenticação:** Bearer token

- **Body:**

```json
{
  "texto": "Muito sucesso para todos!",
  "imagemUrl": "https://imagem.com/post.jpg"
}
```

- **Erros:**
  - `400` — Texto obrigatório
  - `401` — Não autenticado

### DELETE /mensagens/:id

Exclui uma mensagem.

- **Autenticação:** Bearer token
- **Body:** Não possui

- **Erros:**
  - `401` — Não autenticado
  - `403` — Sem permissão