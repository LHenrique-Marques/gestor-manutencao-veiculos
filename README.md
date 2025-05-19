# 🚗 Gestor de Manutenção de Veículos

Sistema desenvolvido como Trabalho I da disciplina de Desenvolvimento Web com Angular, com o objetivo de ajudar usuários a gerenciar o histórico de manutenções dos seus veículos.

## 📋 Descrição

Com o aumento da frota de veículos, manter os cuidados com manutenções periódicas é essencial. Este sistema permite ao usuário:

- Cadastrar e gerenciar veículos
- Registrar manutenções com data, quilometragem e tipo de serviço
- Visualizar histórico de manutenções por veículo
- Receber alertas sobre a ausência de manutenções recentes
- Autenticação segura com login e proteção de rotas

## 🔧 Tecnologias Utilizadas

- Angular (Standalone Components)
- Angular Material
- TypeScript
- JSON Server (simulando backend REST)
- RxJS
- Forms com validação
- LocalStorage + JWT (simulado)
- `concurrently` (para rodar backend e frontend juntos)

## ✅ Funcionalidades

- 🔐 **Login Seguro com JWT**
- 👥 **CRUD de Usuários**
- 🚘 **CRUD de Veículos**
- 🛠️ **CRUD de Manutenções**
- 🔎 **Busca por Tipo de Serviço com Pipe**
- 📊 **Histórico e Alertas de Manutenção**
- 🧭 **Navegação SPA**
- 📱 **Interface Responsiva com Angular Material**

## 🧪 Como rodar o projeto

### 1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/gestor-manutencao-veiculos.git
cd gestor-manutencao-veiculos
```

### 2. Instale as dependências:

```bash
npm install
```
### 4. Execute o projeto (backend + frontend):

```bash
npm start
```

### 🔁 O que acontece:

- 🧩 JSON Server inicia em: `http://localhost:3000`
- 🌐 Angular inicia em: `http://localhost:4200`

## 🗂️ Estrutura de Pastas

```
src/app/
├── pages/        # Componentes de UI (login, dashboard, veiculos, manutencoes)
├── services/     # Serviços com lógica de negócio e integração com API
├── models/       # Interfaces dos dados (usuario, veiculo, manutencao)
├── guards/       # Proteção de rotas com autenticação
├── pipes/        # Pipes para filtro de manutenções
└── app.routes.ts # Roteamento SPA
```

## 📜 Script no package.json

```json
"scripts": {
  "start": "concurrently \"npm run backend\" \"ng serve\"",
  "backend": "json-server --watch db.json --port 3000"
}
```

## 👨‍🎓 Autor

**Luis Henrique Marques Franque Flores**  
Curso: Análise e Desenvolvimento de Sistemas  
UniSenac – Campus Porto Alegre

---

📌 _Este projeto foi desenvolvido com fins educacionais, para prática de Angular e boas práticas de desenvolvimento web._
