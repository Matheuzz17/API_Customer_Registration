
# API de Cadastro de Clientes

API REST para gerenciamento de clientes, desenvolvida com NestJS e TypeScript, seguindo os princípios de Clean Architecture e SOLID.

---

## Tecnologias Utilizadas

- [NestJS](https://nestjs.com/) — framework Node.js para construção de aplicações server-side
- [TypeScript](https://www.typescriptlang.org/) — superset tipado do JavaScript
- [Prisma ORM](https://www.prisma.io/) — ORM para integração com banco de dados
- [MySQL](https://www.mysql.com/) — banco de dados relacional
- [JWT (JSON Web Token)](https://jwt.io/) — autenticação stateless
- [Passport.js](https://www.passportjs.org/) — middleware de autenticação
- [class-validator](https://github.com/typestack/class-validator) — validação de DTOs
- [dotenv](https://github.com/motdotla/dotenv) — gerenciamento de variáveis de ambiente

---

## Estrutura do Projeto

```
src/
├── clients/                        # Módulo de paginação de clientes
│   ├── clients_controller.ts
│   ├── clients_service.ts
│   └── clients_module.ts
│
├── infra/
│   ├── dataBase/
│   │   ├── mappers/                # Mapeamento entre entidades e modelos do Prisma
│   │   │   ├── prismaAddressMappers.ts
│   │   │   └── prismaUserMappers.ts
│   │   └── prisma/
│   │       └── repositories/      # Implementações dos repositórios
│   │           ├── prisma.service.ts
│   │           ├── prismaAddressRepository.ts
│   │           ├── prismaUserRepository.ts
│   │           └── database.module.ts
│   │
│   └── http/
│       └── modules/
│           ├── address/            # Módulo de endereços
│           │   ├── dtos/
│           │   │   └── creaateAddressBody.ts
│           │   ├── address.controller.ts
│           │   └── address.module.ts
│           ├── auth/               # Módulo de autenticação
│           │   ├── dtos/
│           │   │   └── SinginBody.ts
│           │   ├── guards/
│           │   │   ├── jwtAuthGuard.ts
│           │   │   └── localAuthGuard.ts
│           │   ├── middleware/
│           │   │   └── singInDTOValidate.middleware.ts
│           │   ├── models/
│           │   │   ├── authRequestModel.ts
│           │   │   └── UserPayload.ts
│           │   ├── auth.controller.ts
│           │   └── auth.module.ts
│           └── user/               # Módulo de usuários
│               ├── dtos/
│               │   ├── createUserBody.ts
│               │   └── updateUserBody.ts
│               ├── user.controler.ts
│               └── user.module.ts
│
└── modules/
    ├── auth/
    │   └── strategies/
    │       ├── jwt.strategy.ts
    │       └── local.strategy.ts
    ├── entides/                    # Entidades do domínio
    │   ├── Address.ts
    │   └── User.ts
    ├── exchange/                   # Integração com API externa de câmbio
    │   └── exchange.service.ts
    ├── repositories/               # Interfaces dos repositórios
    │   ├── AddressRepository.ts
    │   ├── AddressRepositoryInMemory.ts
    │   ├── UserRepository.ts
    │   └── UserRepositoryInMemory.ts
    ├── UseCases/                   # Casos de uso (regras de negócio)
    │   ├── UseCaseCreateAddress.ts
    │   ├── UseCaseCreateUser.ts
    │   ├── UseCaseDeleteUser.ts
    │   ├── UseCaseFindAllUser.ts
    │   ├── UseCaseFindUserByEmail.ts
    │   ├── UseCaseFindUserByName.ts
    │   └── UseCaseUpdateUser.ts
    └── user/
        └── factories/
            └── userFactory.ts
```

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) v18 ou superior
- [MySQL](https://www.mysql.com/) rodando localmente
- [npm](https://www.npmjs.com/)

---

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente criando um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="mysql://root:sua_senha@localhost:3306/cadastro_cliente"
JWT_SECRET=sua_chave_secreta
```

4. Crie o banco de dados no MySQL:

```sql
CREATE DATABASE cadastro_cliente;
```

5. Execute as migrations do Prisma:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

## Execução

### Desenvolvimento

```bash
npm run start:dev
```

### Produção

```bash
npm run build
npm run start:prod
```

A API estará disponível em `http://localhost:3000`.

---

## Documentação das Rotas

### Autenticação

| Método | Rota      | Descrição              | Auth |
|--------|-----------|------------------------|------|
| POST   | `/singIn` | Login e geração de JWT | Não  |

**Body:**
```json
{
  "email": "maria@email.com",
  "password": "senha123"
}
```

**Resposta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Clientes

> Todas as rotas de clientes requerem autenticação JWT.  
> Adicione o header: `Authorization: Bearer {token}`

| Método | Rota                    | Descrição                     |
|--------|-------------------------|-------------------------------|
| POST   | `/Clientes`             | Cadastrar novo cliente        |
| GET    | `/Clientes`             | Listar todos os clientes      |
| GET    | `/Clientes/name/:name`  | Buscar clientes por nome      |
| GET    | `/Clientes/email/:email`| Buscar cliente por email      |
| PUT    | `/Clientes/:id`         | Atualizar dados do cliente    |
| DELETE | `/Clientes/:id`         | Remover cliente               |

#### POST `/Clientes` — Cadastrar cliente

**Body:**
```json
{
  "name": "Maria Silva",
  "email": "maria@email.com",
  "password": "senha123",
  "phone": "999999999"
}
```

#### GET `/Clientes` — Listar todos os clientes

Suporta paginação via query params:

```
GET /clients?page=1&limit=10
```

**Resposta:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Maria Silva",
      "email": "maria@email.com",
      "phone": "999999999"
    }
  ],
  "meta": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

#### GET `/Clientes/name/:name` — Buscar por nome

```
GET /Clientes/name/Maria
```

#### GET `/Clientes/email/:email` — Buscar por email

```
GET /Clientes/email/maria@email.com
```

#### PUT `/Clientes/:id` — Atualizar cliente

**Body:**
```json
{
  "name": "Maria Souza",
  "phone": "988888888"
}
```

#### DELETE `/Clientes/:id` — Remover cliente

```
DELETE /Clientes/uuid-do-cliente
```

---

### Endereços

| Método | Rota                              | Descrição                      | Auth |
|--------|-----------------------------------|--------------------------------|------|
| POST   | `/clients/:clientId/addresses`    | Cadastrar endereço do cliente  | Sim  |

**Body:**
```json
{
  "street": "Rua das Flores",
  "number": "123",
  "district": "Centro",
  "city": "João Pessoa",
  "state": "PB",
  "zipCode": "58000-000"
}
```

---

## Arquitetura

O projeto segue os princípios de **Clean Architecture**, dividida em três camadas:

**Camada de Negócio** — contém as entidades (`User`, `Address`), interfaces dos repositórios e os casos de uso com as regras de negócio, sem dependência de frameworks externos.

**Camada de Dados** — contém as implementações dos repositórios com Prisma, mappers para conversão entre entidades e modelos do banco, e a integração com a API externa de câmbio.

**Camada de Aplicação** — contém os controllers REST, DTOs de entrada e saída, guards de autenticação e validações de request.

---

## Variáveis de Ambiente

| Variável       | Descrição                        | Exemplo                                              |
|----------------|----------------------------------|------------------------------------------------------|
| `DATABASE_URL` | URL de conexão com o MySQL       | `mysql://root:senha@localhost:3306/cadastro_cliente` |
| `JWT_SECRET`   | Chave secreta para geração do JWT| `minha_chave_secreta`                                |


Alunos: Ruan Thoamaz 01814470, Pedro David 01823976, Matheus Gomes da Silva 01812898
