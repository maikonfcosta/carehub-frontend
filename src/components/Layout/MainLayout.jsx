// carehub-frontend/src/components/Layout/MainLayout.jsx

import React, { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config'; // Serviço de Auth do Firebase
import { signOut } from 'firebase/auth'; 

// 🚨 DEFINIÇÃO DO TEMPO LIMITE (10 minutos em milissegundos) 🚨
const INACTIVITY_TIMEOUT = 10 * 60 * 1000; // 600000 ms

const MainLayout = ({ children }) => {
    const navigate = useNavigate();
    const timeoutRef = useRef(null); // Referência para o timer de inatividade

    // Definição do menu lateral (mantida)
    const menuItems = [
        { name: "Cadastro de Paciente", path: "/cadastro/paciente" },
        { name: "Cadastro de Médicos", path: "/cadastro/medico" },
        { name: "Agendamento de Consulta", path: "/agendamento" },
        { name: "---", path: "" },
        { name: "Consultas Agendadas", path: "/consultas" },
        { name: "Pagamentos", path: "/pagamentos" },
        { name: "---", path: "" },
        { name: "Pacientes Cadastrados", path: "/tabelas/pacientes" },
        { name: "Médicos Cadastrados", path: "/tabelas/medicos" },
    ];

    // 🚨 FUNÇÃO DE LOGOUT (Chamada ao clicar ou pelo timeout) 🚨
    const handleLogout = useCallback(async () => {
        try {
            await signOut(auth); // Desloga o usuário do Firebase
        } catch (error) {
            console.error("Erro ao deslogar no Firebase:", error);
        }
        
        localStorage.removeItem('firebaseToken'); // 1. Limpa o token local
        navigate('/login'); // 2. Redireciona
    }, [navigate]);

    // Função para resetar o contador de inatividade
    const resetTimer = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        // Inicia um novo timeout que chamará handleLogout se for atingido
        timeoutRef.current = setTimeout(handleLogout, INACTIVITY_TIMEOUT);
    }, [handleLogout]);

    // 🚨 EFEITO PRINCIPAL PARA MONITORAR A INATIVIDADE 🚨
    useEffect(() => {
        const token = localStorage.getItem('firebaseToken');
        
        // Só ativa o monitoramento se o usuário estiver logado
        if (token) {
            resetTimer(); 

            // Lista de eventos que indicam atividade
            const events = ['mousemove', 'keypress', 'scroll', 'click'];
            events.forEach(event => {
                window.addEventListener(event, resetTimer);
            });

            // Cleanup: Limpa o timer e os listeners ao desmontar ou deslogar
            return () => {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
                events.forEach(event => {
                    window.removeEventListener(event, resetTimer);
                });
            };
        }
    }, [resetTimer]); 

    return (
        <div style={styles.mainContainer}>
            {/* 1. Menu Lateral */}
            <div style={styles.sidebar}>
                <h3 style={styles.logo} onClick={() => navigate('/')}>CareHub</h3>
                <nav>
                    {menuItems.map((item, index) => (
                        item.name === "---" ? (
                            <hr key={index} style={{ margin: '10px 0', borderColor: '#4a4a4a' }} />
                        ) : (
                            <button
                                key={index}
                                style={styles.menuItem}
                                onClick={() => navigate(item.path)}
                            >
                                {item.name}
                            </button>
                        )
                    ))}
                </nav>
                <button 
                    onClick={handleLogout} 
                    style={styles.logoutButton}
                >
                    Sair
                </button>
            </div>

            {/* 2. Conteúdo Principal */}
            <div style={styles.content}>
                {children}
            </div>
        </div>
    );
};

// 🚨 ESTILOS PARA TEMA ESCURO 🚨
const styles = {
    mainContainer: {
        display: 'flex', 
        minHeight: '100vh', 
        backgroundColor: '#1e1e1e' // Fundo da aplicação (Dark Gray)
    },
    sidebar: {
        width: '250px',
        backgroundColor: '#333333', // Fundo do Menu (Slightly darker)
        color: 'white',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
    },
    logo: {
        textAlign: 'center',
        marginBottom: '30px',
        color: '#00cc99', // Cor de destaque
        cursor: 'pointer'
    },
    menuItem: {
        background: 'none',
        border: 'none',
        color: 'white',
        textAlign: 'left',
        padding: '10px 0',
        width: '100%',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.2s',
        marginBottom: '5px',
    },
    content: {
        flexGrow: 1,
        padding: '20px',
        backgroundColor: '#1e1e1e', // Fundo da área de conteúdo
        color: 'white', // Cor do texto padrão
    },
    logoutButton: {
        marginTop: 'auto',
        padding: '10px',
        backgroundColor: '#cc0000', // Vermelho forte
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '4px'
    }
};

export default MainLayout;