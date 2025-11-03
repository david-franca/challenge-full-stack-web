# Projeto Frontend: Gestão de Alunos (Vue.js 3 + Vuetify)

Esta é a aplicação frontend (SPA - Single Page Application) para o projeto de teste Full Stack de Gestão de Alunos. Ela fornece uma interface de usuário rica, responsiva e segura para interagir com a API de backend.

O projeto foi construído com Vue.js 3 (Composition API) e Vuetify 3, com foco em uma arquitetura moderna, manutenível e com excelente gerenciamento de estado.

## 📸 Screenshots

|             Tela de Login             |          Listagem de Alunos (Desktop)          |                    Listagem (Responsivo)                    |
| :-----------------------------------: | :--------------------------------------------: | :---------------------------------------------------------: |
| ![Página de login](/public/login.png) | ![Lista de Alunos](/public//students_list.png) | ![Lista de Alunos Mobile](/public/mobile_stutends_list.png) |

---

## ✨ Funcionalidades Principais

- **Autenticação JWT Completa:**
  - Tela de login segura que armazena o token JWT.
  - O `role` do usuário (ex: `admin`) é lido diretamente do _payload_ do token.
  - **Logout Automático:** O usuário é deslogado automaticamente quando o token JWT expira (usando `setTimeout`).
  - **Interceptor 401:** Um interceptor global do Axios desloga o usuário se qualquer chamada de API retornar `401 Unauthorized`.

- **Controle de Acesso Baseado em Função (RBAC):**
  - A interface se adapta dinamicamente com base no `role` do usuário.
  - **Rotas Protegidas:** O `vue-router` bloqueia o acesso a rotas (ex: `/users`) se o usuário não for `admin`.
  - **UI Condicional:** Botões (como "Excluir Aluno" ou "Criar Usuário") são escondidos usando `v-if` se o usuário não tiver a permissão necessária.

- **Gerenciamento de Estado Híbrido:**
  - **Pinia (Estado do Cliente):** Usado para gerenciar o estado global da aplicação (status de autenticação, `role` do usuário, snackbars).
  - **TanStack Query / Vue Query (Estado do Servidor):** Usado para todo o cache de dados da API, `isLoading`, `isError`, `isFetching` e invalidação de cache.

- **CRUD Completo com UX Polida:**
  - **Leitura (Read):** Listagem de alunos com busca, paginação e ordenação (tudo gerenciado por _query params_ na URL).
  - **Criação/Atualização (Create/Update):** Um único componente de formulário (`StudentFormDialog`) é reutilizado para ambas as ações.
  - **Exclusão (Delete):** Um diálogo de confirmação (`ConfirmDeleteDialog`) previne exclusões acidentais.

- **Performance e Carregamento:**
  - **`v-skeleton-loader`** é exibido durante o carregamento inicial da tabela.
  - Indicadores de carregamento (`v-progress-circular`) são usados em botões durante as mutações (salvar, excluir).
  - Otimização de build com **`vite-plugin-vuetify`** para _tree-shaking_ automático, garantindo o menor tamanho de bundle possível.

- **Internacionalização (i18n):**
  - Suporte completo a múltiplos idiomas (PT, EN, ES) usando `vue-i18n`.

- **Testes Automatizados:**
  - **Testes Unitários** com Vitest para a lógica de negócios (ex: `auth.store`).
  - **Testes de Componente** com Vue Test Utils para a lógica de UI (ex: provar que o botão "Excluir" só aparece para `admin`).

---

## 💻 Pilha de Tecnologias (Frontend)

- **Framework:** [Vue.js 3](https://vuejs.org/) (com Composition API e `<script setup>`)
- **UI Library:** [Vuetify 3](https://vuetifyjs.com/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Gestão de Estado (Cliente):** [Pinia](https://pinia.vuejs.org/)
- **Gestão de Estado (Servidor):** [TanStack Query (Vue Query)](https://tanstack.com/query/v5/docs/vue/overview)
- **Roteamento:** [Vue Router 4](https://router.vuejs.org/)
- **i18n:** [Vue I18n](https://vue-i18n.intlify.dev/)
- **Cliente HTTP:** [Axios](https://axios-http.com/)
- **Testes:** [Vitest](https://vitest.dev/) + [Vue Test Utils](https://test-utils.vuejs.org/)

---

## 🚀 Como Executar o Projeto

### 1. Pré-requisitos

- [Node.js](https://nodejs.org/) (v18+ recomendado)
- [Yarn](https://yarnpkg.com/) ou npm
- O **[projeto Backend](LINK_PARA_SEU_REPO_BACKEND)** deve estar em execução.

### 2. Instalação

1. **Clone o repositório:**

   ```bash
   git clone [URL_DO_SEU_REPOSITORIO_FRONTEND]
   cd [pasta-do-frontend]
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   # ou
   yarn install
   ```

### 3. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (ex: `.env.local`):

```env
# URL onde a API do backend está rodando
VITE_API_URL=http://localhost:3000
```
