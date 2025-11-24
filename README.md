# 🖥️ CareHub Front-end (React)

Interface de Usuário (SPA) construída em **React.js** usando o **Vite**.

## ⚙️ Tecnologias Principais

| Componente | Tecnologia | Versão Principal |
| :--- | :--- | :--- |
| **Framework** | **React** (Vite) | 18+ |
| **Roteamento** | **React Router DOM** | 6.x |
| **HTTP** | **Axios Interceptor** | 1.x |
| **Autenticação** | **Firebase (Client SDK)** | 10.x |
| **Pagamentos** | **@stripe/react-stripe-js** | 25.x |
| **UX/UI** | Tema Dark Consistente | - |

## 🚀 Como Rodar Localmente

### 1. Instalação e Execução

Instale as dependências: `npm install`
Execute o Front-end: `npm run dev`
Acesse em: `http://localhost:5173/`

### 2. Fluxo de Autenticação

 1.  **Redirecionamento:** O usuário é levado para a rota `/login` pelo `ProtectedRoute` se não houver token no `localStorage`.
 2.  **Login:** O `LoginPage.jsx` utiliza o Firebase Client SDK para autenticar o usuário.
 3.  **Token:** O token JWT retornado é salvo no `localStorage`.
 4.  **Axios Interceptor:** Um interceptor em `src/api/api.js` anexa automaticamente o token a **todas** as requisições enviadas ao Back-end.
 5.  **Logout e Inatividade:** O sistema implementa **Logout manual** e **Timeout de Inatividade** (10 minutos) no `MainLayout.jsx`, garantindo que o token seja limpo ao sair.

## ☁️ Deploy e Integração (Vercel)

A comunicação com o Back-end (Render) é estabelecida via variáveis de ambiente. A aplicação exige a configuração das seguintes variáveis no painel da Vercel:

| Variável | Descrição |
| :--- | :--- |
| **`VITE_API_BASE_URL`** | URL pública do Back-end no Render (Ex: `https://carehub-api.onrender.com/api`). |
| **`VITE_STRIPE_PUBLIC_KEY`** | Chave publicável do Stripe para inicialização dos formulários. |

## ⚖️ Licença

Este projeto está licenciado sob os termos da **Licença MIT**. Para mais detalhes, consulte o arquivo [LICENSE.md] na raiz do repositório.
