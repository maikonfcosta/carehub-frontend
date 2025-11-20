// carehub-frontend/src/App.jsx (CÓDIGO FINAL E CORRIGIDO)

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Componentes de Layout e Formulários
import MainLayout from './components/Layout/MainLayout';
import CadastroPaciente from './components/CadastroPaciente';
import AgendamentoConsulta from './components/AgendamentoConsulta';

// Páginas de Navegação e Tabelas
import HomePage from './pages/HomePage';
import TabelaPacientes from './pages/TabelaPacientes';
import TabelaMedicos from './pages/TabelaMedicos';
import ConsultasAgendadas from './pages/ConsultasAgendadas';
import PagamentosPage from './pages/PagamentosPage';
import CadastroMedico from './pages/CadastroMedico'; 
import LoginPage from './pages/LoginPage'; // ⬅️ IMPORTADO CORRETAMENTE

// Componente de Rota Protegida (Firebase Token Check)
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('firebaseToken'); 
    // Se não estiver autenticado, redireciona para a página de login
    return isAuthenticated ? <MainLayout>{children}</MainLayout> : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <Routes>
                {/* 1. Rota de Login: Ponto de entrada público */}
                <Route path="/login" element={<LoginPage />} /> 

                {/* 2. Rotas Protegidas (Todas usam o MainLayout e exigem token) */}
                <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                <Route path="/cadastro/paciente" element={<ProtectedRoute><CadastroPaciente /></ProtectedRoute>} />
                <Route path="/cadastro/medico" element={<ProtectedRoute><CadastroMedico /></ProtectedRoute>} />
                <Route path="/agendamento" element={<ProtectedRoute><AgendamentoConsulta /></ProtectedRoute>} />
                <Route path="/consultas" element={<ProtectedRoute><ConsultasAgendadas /></ProtectedRoute>} />
                <Route path="/pagamentos" element={<ProtectedRoute><PagamentosPage /></ProtectedRoute>} />
                <Route path="/tabelas/pacientes" element={<ProtectedRoute><TabelaPacientes /></ProtectedRoute>} />
                <Route path="/tabelas/medicos" element={<ProtectedRoute><TabelaMedicos /></ProtectedRoute>} /> 
                {/* ⬅️ CORRIGIDA AQUI, SEM USAR PLACEHOLDERS */}

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;