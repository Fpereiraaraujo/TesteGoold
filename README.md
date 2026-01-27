=============================================================================
                      GOLDSPELL - SISTEMA DE AGENDAMENTOS
=============================================================================

SOBRE O PROJETO
---------------
O GoldSpell é uma aplicação web completa para gestão de agendamentos de salas
e espaços corporativos. O sistema conta com controle de acesso baseado em 
níveis (Administrador e Cliente), gestão de horários, logs de auditoria e 
dashboards responsivos.

TECNOLOGIAS UTILIZADAS
----------------------

[FRONTEND]
- Framework: Next.js 13+ (App Router)
- Linguagem: TypeScript
- Estilização: Tailwind CSS
- Ícones: Phosphor React
- Notificações: Sonner (Toaster)
- Requisições HTTP: Axios
- Gerenciamento de Estado: React Hooks & Context API

[BACKEND]
- Runtime: Node.js
- Framework: Express
- Banco de Dados: PostgreSQL
- ORM: Sequelize
- Autenticação: JWT (JSON Web Token)
- Criptografia: Bcrypt
- Logs e Validações internas

=============================================================================
                            FUNCIONALIDADES
=============================================================================

1. MÓDULO ADMINISTRATIVO
   - Dashboard com visão geral dos agendamentos.
   - Aprovação ou cancelamento de solicitações de agendamento.
   - Gestão de Clientes (Listagem, visualização de permissões, Toggle de Status Ativo/Inativo).
   - Logs do Sistema: Histórico completo de ações com filtros e paginação.
   - Configurações de Sala: Edição de horários e nomes das salas via Modal.

2. MÓDULO DO CLIENTE
   - Solicitação de Agendamentos (com validação de data retroativa).
   - Visualização dos próprios agendamentos e status (Pendente, Aprovado, Recusado).
   - Histórico de Logs pessoal.
   - Gestão de Perfil.

3. GERAL
   - Layout Responsivo (Menu Lateral adaptável mobile/desktop).
   - Feedback visual via Toasts (Carregando, Sucesso, Erro).
   - Proteção de rotas (Middleware/Contexto de Autenticação).

=============================================================================
                        GUIA DE INSTALAÇÃO E EXECUÇÃO
=============================================================================

PRÉ-REQUISITOS
- Node.js (v18 ou superior)
- PostgreSQL instalado e rodando

-----------------------------------------------------------------------------
PASSO 1: CONFIGURAÇÃO DO BACKEND
-----------------------------------------------------------------------------

1. Navegue até a pasta do backend:
   $ cd backend

2. Instale as dependências:
   $ npm install

3. Configure as variáveis de ambiente:
   - Crie um arquivo .env na raiz do backend.
   - Copie o exemplo abaixo e preencha com seus dados:

     PORT=3333
     DB_HOST=localhost
     DB_USER=postgres
     DB_PASS=sua_senha_postgres
     DB_NAME=goldspell_db
     JWT_SECRET=sua_chave_secreta_super_segura

4. Execute as migrações (Criação das tabelas):
   $ npx sequelize-cli db:migrate

5. (Opcional) Popule o banco com dados iniciais (Admin user, etc):
   $ npx sequelize-cli db:seed:all

6. Inicie o servidor:
   $ npm run dev

   > O servidor rodará em http://localhost:3333

-----------------------------------------------------------------------------
PASSO 2: CONFIGURAÇÃO DO FRONTEND
-----------------------------------------------------------------------------

1. Navegue até a pasta do frontend:
   $ cd frontend

2. Instale as dependências:
   $ npm install

3. Configure as variáveis de ambiente:
   - Crie um arquivo .env.local na raiz do frontend.
   - Adicione a URL da API:

     NEXT_PUBLIC_API_URL=http://localhost:3333

4. Inicie a aplicação:
   $ npm run dev

   > A aplicação estará disponível em http://localhost:3000

=============================================================================
                        REGRAS DE NEGÓCIO IMPLEMENTADAS
=============================================================================

1. AGENDAMENTOS
   - Um cliente não pode solicitar agendamento em data ou horário passado.
   - O sistema valida disponibilidade da sala (Backend).
   - Apenas administradores podem Aprovar ou Recusar definitivamente.

2. SEGURANÇA
   - Senhas são criptografadas antes de salvar no banco.
   - Rotas administrativas são protegidas; clientes não conseguem acessar URLs de admin.
   - Token JWT expira automaticamente para segurança da sessão.

3. INTERFACE
   - Feedback imediato: O usuário é notificado via "Sonner" sobre o sucesso ou erro de cada ação.
   - Sidebar Responsiva: Em telas pequenas, o menu se oculta e pode ser acionado via botão hambúrguer.

=============================================================================
ESTRUTURA DE PASTAS (RESUMO)
=============================================================================

/backend
  /src
    /controllers  -> Lógica das requisições
    /models       -> Modelos do Banco de Dados (Sequelize)
    /services     -> Regras de negócio
    /routes.ts    -> Definição das rotas da API
    server.ts     -> Entrada da aplicação

/frontend
  /src
    /app          -> Páginas e Rotas (Next.js App Router)
      /dashboard
        /admin    -> Páginas do Administrador
        /client   -> Páginas do Cliente
    /components   -> Componentes Reutilizáveis (Modais, Sidebar, Tabelas)
    /contexts     -> Contexto de Autenticação (Login/Logout)
    /services     -> Configuração do Axios (api.ts)

=============================================================================
AUTOR
=============================================================================
Desenvolvido para o projeto GoldSpell.
