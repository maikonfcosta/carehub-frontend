# 🖥️ CareHub Front-end (React)

Interface de Usuário (SPA - Single Page Application) construída em **React.js** usando o **Vite** para consumir a CareHub API (Spring Boot).

## ⚙️ Tecnologias Principais

| Componente | Tecnologia | Versão Principal |
| :--- | :--- | :--- |
| **Framework** | **React** | 18+ |
| **Build Tool** | **Vite** | 5.x |
| **Requisições HTTP**| **Axios** | 1.x |
| **Linguagem** | **JavaScript/JSX** | ES6+ |
| **Deploy** | **Vercel** | - |

## 🚀 Como Rodar Localmente (Desenvolvimento)

### 1. Instalação

Na pasta raiz do projeto (`carehub-frontend/`):

```bash
npm install
```

### 2. Configuração da API

A URL base da API é configurada em ```src/api/api.js```.

- Em Desenvolvimento Local: A API é acessada em ```http://localhost:8080/api```.

### 3. Execução

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O aplicativo estará disponível em ```http://localhost:5173/```.

## ☁️ Deploy e Integração (Vercel)

O Front-end é hospedado no Vercel.

**Variáveis de Ambiente (Vercel):**

Para que o Front-end possa se comunicar com o Back-end hospedado no Render, defina a seguinte variável no Vercel (seção Environment):

| Variável | Valor | Descrição |
| :--- | :--- | :--- |
| VITE_API_BASE_URL | URL pública do Back-end (Render) | Ex: ```https://carehub-api.onrender.com/api``` |