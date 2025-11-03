# Comentários sobre o Projeto Frontend

Este documento detalha as decisões de arquitetura, bibliotecas utilizadas e outras considerações sobre o desenvolvimento da aplicação frontend em Vue.js.

## 1. Decisão da Arquitetura Utilizada

A arquitetura deste frontend foi escolhida para maximizar a manutenibilidade, performance e escalabilidade, separando claramente as responsabilidades.

* **Vue.js 3 com Composition API (`<script setup>`):** Escolhido pela sua reatividade eficiente, performance e pela organização lógica limpa que a Composition API permite (agrupando lógica por funcionalidade, não por *options*).
* **Gestão de Estado Híbrida (Pinia + TanStack Query):** Esta é a decisão de arquitetura mais importante. Em vez de usar um único store global para tudo, separei o estado em duas categorias:
  * **Estado do Cliente (com Pinia):** Usado para dados globais e síncronos da UI, como o status de autenticação do usuário (`token`, `role`, `isLoggedIn`) e o controle de snackbars.
  * **Estado do Servidor (com TanStack Query):** Usado para todo o ciclo de vida de dados da API (alunos, usuários). Ele gerencia automaticamente o cache, `isLoading`, `isError`, `refetching` e invalidação de cache após mutações (create, update, delete), o que simplifica drasticamente a lógica de carregamento e sincronização.
* **Componentização e Reutilização:** Componentes como `StudentFormDialog` e `ConfirmDeleteDialog` foram criados para serem reutilizados, recebendo `props` e emitindo eventos, o que segue os princípios DRY (Don't Repeat Yourself).
* **Roteamento (Vue Router):** Utilizado para gerenciar a navegação da SPA e para implementar **Guardas de Rota** (Navigation Guards), que protegem o acesso às páginas com base no status de autenticação (lido do store do Pinia).
* **i18n (Vue I18n):** A arquitetura foi construída para suportar internacionalização desde o início, com todos os textos estáticos extraídos para arquivos de tradução (`pt`, `en`, `es`).
* **Testes (Vitest):** A arquitetura foi validada com testes unitários (para a lógica de store) e testes de componente (para a lógica de UI, como o RBAC), garantindo que as regras de negócio funcionem como esperado.

## 2. Lista de Bibliotecas de Terceiros

| Biblioteca | Propósito |
| :--- | :--- |
| **`vue`** / **`vite`** | Framework principal e build tool. |
| **`vuetify`** | Biblioteca de UI principal para agilizar a construção da interface responsiva. |
| **`pinia`** | Gerenciamento de estado do cliente (autenticação, UI). |
| **`@tanstack/vue-query`** | Gerenciamento de estado do servidor (cache, fetching, mutações). |
| **`vue-router`** | Roteamento da SPA e guardas de rota. |
| **`vue-i18n`** | Internacionalização (traduções). |
| **`axios`** | Cliente HTTP para comunicação com a API (com interceptadores 401). |
| **`jwt-decode`** | Utilizado para decodificar o payload do JWT e extrair o `role` do usuário. |
| **`vitest` / `@vue/test-utils`** | Framework de testes unitários e de componente. |

## 3. O que eu melhoraria se tivesse mais tempo

* **Testes E2E (End-to-End):** Implementaria testes E2E com **Cypress** ou **Playwright** para simular o fluxo completo do usuário (login -> criar aluno -> editar -> deletar), garantindo que a integração entre o front e o back esteja 100%.
* **Acessibilidade (a11y) Avançada:** Faria uma auditoria completa de acessibilidade, garantindo que todos os componentes (especialmente modais e formulários) sejam 100% navegáveis via teclado e compatíveis com leitores de tela, indo além dos padrões do Vuetify.
* **CI/CD Pipeline:** Configuraria um pipeline no GitHub Actions (ou GitLab CI) para rodar automaticamente os testes e fazer o deploy da aplicação em um ambiente de *staging* a cada push na `main`.

## 4. Quais requisitos obrigatórios não foram entregues

Com base nos requisitos discutidos e implementados, **todos os requisitos obrigatórios foram entregues com sucesso.**

Isso inclui:

* Autenticação JWT completa.
* CRUD de Alunos.
* Controle de Acesso (RBAC) no frontend (escondendo botões) e no backend (protegendo rotas).
* Paginação, busca e ordenação.
* Responsividade e Internacionalização.
* Testes unitários e de componente.

# Comentários sobre o Projeto Backend

Este documento detalha as decisões de arquitetura, bibliotecas utilizadas e outras considerações sobre o desenvolvimento da API RESTful em NestJS.

## 1. Decisão da Arquitetura Utilizada

A arquitetura deste backend foi baseada nos princípios do **NestJS** para criar uma API modular, escalável e de fácil manutenção, com uma clara separação de responsabilidades.

* **Arquitetura Modular:** O projeto é dividido em Módulos (ex: `AuthModule`, `StudentsModule`, `UsersModule`). Cada módulo encapsula seus próprios `Controllers`, `Services` e `Entities` (DTOs), tornando o código desacoplado e fácil de navegar.
* **Separação de Camadas:**
  * **Controllers:** Responsáveis *apenas* pela camada HTTP. Recebem requisições, validam DTOs e chamam os serviços.
  * **Services:** Responsáveis por *toda* a lógica de negócios. É aqui que as regras (ex: "verificar se RA já existe antes de criar") são implementadas.
  * **Repository (via TypeORM):** A camada de serviço abstrai a comunicação com o banco de dados através do padrão Repository injetado pelo TypeORM.
* **Segurança (AuthN & AuthZ):**
  * **Autenticação (AuthN):** Feita com **Passport.js** e **JWT**. O `AuthGuard('jwt')` protege todas as rotas que exigem um token válido.
  * **Autorização (AuthZ):** Implementei um sistema de **RBAC (Role-Based Access Control)**. Um `RolesGuard` personalizado, combinado com um decorator `@Roles('admin')`, protege endpoints específicos, garantindo que apenas usuários com o `role` correto (lido do payload do JWT) possam executar ações críticas (como `DELETE` ou `PATCH`).
* **Validação (DTOs):** `class-validator` e `class-transformer` são usados em todos os DTOs (`CreateStudentDto`, etc.) para garantir que nenhum dado inválido chegue à camada de serviço.
* **ORM (TypeORM):** Escolhido pela sua forte integração com TypeScript e NestJS, permitindo o uso de *Entities* e o padrão Repository.
* **Testes (Jest):** A arquitetura foi validada com testes unitários tanto para os `Controllers` (verificando se as rotas chamam os serviços corretos) quanto para os `Services` (verificando a lógica de negócios e as interações com o repositório mockado).

## 2. Lista de Bibliotecas de Terceiros

| Biblioteca | Propósito |
| :--- | :--- |
| **`@nestjs/core`** | Framework principal da aplicação. |
| **`@nestjs/typeorm` / `typeorm`** | ORM para comunicação com o banco de dados (PostgreSQL). |
| **`pg`** (ou `mysql2`) | Driver do banco de dados PostgreSQL. |
| **`@nestjs/jwt` / `@nestjs/passport`** | Implementação de autenticação JWT e estratégia Passport. |
| **`passport-jwt` / `passport-local`** | Estratégias do Passport. |
| **`class-validator`** | Validação automática de DTOs. |
| **`class-transformer`** | Transformação automática de payloads (ex: JSON para DTO). |
| **`nestjs-typeorm-paginate`** | Biblioteca para facilitar a implementação de paginação nos repositórios TypeORM. |
| **`bcrypt`** | Hashing de senhas. |
| **`@nestjs/testing` / `jest`** | Framework de testes unitários. |

## 3. O que eu melhoraria se tivesse mais tempo

* **Testes de Integração / E2E:** Embora os testes unitários cubram a lógica, eu adicionaria testes E2E (usando o `Test.createTestingModule` para montar o app inteiro) para testar o fluxo completo de uma requisição HTTP até a resposta, incluindo a interação real com o banco de dados de teste (usando um banco em-memória ou Docker).
* **Logging Avançado:** Implementaria um sistema de logging mais robusto (como **Winston** ou **Pino**) para formatar logs (ex: JSON) e um serviço de monitoramento de erros (como **Sentry**) para capturar exceções em produção.
* **Índices no Banco de Dados:** Faria uma análise de performance (`EXPLAIN ANALYZE`) nas queries de busca (`ILike`) e adicionaria índices de banco de dados (`GIN` ou `Trigram`) nas colunas `name`, `email`, `ra` e `cpf` para otimizar drasticamente a velocidade da busca.
* **CI/CD Pipeline:** Configuraria um GitHub Actions para rodar os testes e o linter a cada pull request e, em caso de merge na `main`, fazer o deploy automático da API (ex: usando Docker e um serviço de container).

## 4. Quais requisitos obrigatórios não foram entregues

Com base nos requisitos discutidos e implementados, **todos os requisitos obrigatórios foram entregues com sucesso.**

Isso inclui:

* API RESTful completa com NestJS.
* Autenticação JWT.
* Controle de Acesso (RBAC) no backend (protegendo endpoints com Guards).
* CRUD de Alunos com paginação, busca e ordenação.
* Testes unitários completos para o `StudentsModule`.
