
# Trabalho I – Gestor de Manutenção de Veículos

**Aluno:** Luis Henrique Marques Franque Flores  
**Curso:** Análise e Desenvolvimento de Sistemas – UniSenac Porto Alegre  
**Disciplina:** Framework para Desenvolvimento Web II  
**Data prevista para entrega:** 22/05/2025

---

## 🧾 Introdução

Este trabalho consiste no desenvolvimento de uma aplicação Web SPA (Single Page Application) utilizando Angular. O objetivo é simular um sistema de gestão de manutenções de veículos, permitindo aos usuários controlarem manutenções preventivas, evitando gastos futuros e aumentando a vida útil dos seus veículos.

A aplicação segue os conceitos vistos em aula, utilizando componentes Angular, serviços, Pipes, rotas protegidas, e integração com uma API Fake (`JSON Server`).

---

## 🎯 Objetivo

Criar uma aplicação funcional utilizando o framework Angular com as seguintes funcionalidades:
- Login com autenticação simulada (JWT + LocalStorage)
- CRUDs completos de usuários e veículos
- Cadastro e histórico de manutenções
- Filtro por tipo de serviço
- Validações de formulários
- Relacionamento entre entidades (usuário → veículo → manutenção)
- Interface responsiva com Angular Material
- Navegação SPA
- Deploy local com script automatizado

---

## 🔧 Tecnologias Utilizadas

- Angular 16+ (com componentes standalone)
- Angular Material
- JSON Server (API fake simulando o backend)
- TypeScript
- RxJS
- concurrently (para rodar frontend + backend juntos)
- Node.js

---

## ✅ Funcionalidades implementadas

| Funcionalidade                                | Descrição |
|-----------------------------------------------|-----------|
| Login com Token                                | Armazenamento no LocalStorage, com proteção de rotas por RouteGuard |
| CRUD de Usuários                               | Cadastro, listagem, edição e remoção |
| CRUD de Veículos                               | Relacionado ao usuário logado |
| CRUD de Manutenções                            | Relacionado ao veículo selecionado |
| Relacionamento entre entidades                 | Usuário → Veículo → Manutenção |
| Filtro por tipo de serviço                     | Pipe personalizado para busca |
| Validações de formulários                      | Com `ReactiveForms` e `mat-error` |
| Alerta de manutenção vencida                   | Exibe no dashboard quando há risco |
| Navegação SPA                                  | Via `app.routes.ts` |
| Responsividade                                 | Angular Material para todos os componentes |
| Deploy local automatizado                      | `start-clean.js` com concurrently |
| Código modularizado                            | Separação clara em `pages`, `services`, `models`, `guards`, `pipes` |

---

## 📦 Estrutura de execução (automatizada)

Ao executar `npm start`, o sistema:
- Inicia o JSON Server (http://localhost:3000)
- Inicia o Angular (http://localhost:4200)
- Oculta os logs técnicos e mostra apenas:
```
✅ Projeto rodando em:
🔹 Frontend: http://localhost:4200
🔹 Backend (Fake API): http://localhost:3000
```
Tudo isso é feito via o script `start-clean.js` e configuração no `package.json`.

---

## 📁 Estrutura de Pastas

```
src/app/
├── pages/        # Componentes de UI (login, dashboard, veiculos, manutencoes)
├── services/     # Regras de negócio e integração com API
├── models/       # Interfaces (Usuario, Veiculo, Manutencao)
├── guards/       # Proteção de rotas com RouteGuard
├── pipes/        # Pipes personalizados (filtro de serviço)
└── app.routes.ts # Rotas SPA
```

---

## 🧪 Teste e Apresentação

Para testar:
```bash
npm install
npm start
```
O projeto roda localmente com todas as funcionalidades acessíveis via navegador.

---

## 🧠 Conclusão

Este projeto demonstra o domínio dos conceitos essenciais do Angular, como componentes standalone, services, injeção de dependência, rotas protegidas, filtros com Pipes, e uso de uma API externa (mesmo fake). A experiência de uso é fluida, e o código está modularizado, validado e pronto para produção.
