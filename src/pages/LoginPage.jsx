// carehub-frontend/src/pages/LoginPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config'; // Importa o serviço auth
import { signInWithEmailAndPassword } from 'firebase/auth';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Tenta carregar a HomePage se já houver um token
    useEffect(() => {
        if (localStorage.getItem('firebaseToken')) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // 1. Tenta fazer o login com Email e Senha
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. Obtém o ID Token (JWT) do Firebase
            const idToken = await user.getIdToken();
            
            // 3. Armazena o Token no LocalStorage
            localStorage.setItem('firebaseToken', idToken);
            
            // 4. Redireciona para a página principal
            navigate('/');

        } catch (err) {
            console.error("Erro de Autenticação Firebase:", err);
            // Mensagem genérica para segurança
            setError('Falha no Login. Verifique o email e a senha.');
            localStorage.removeItem('firebaseToken');
        } finally {
            setIsLoading(false);
        }
    };

    // Estilos para o tema escuro
    const styles = { 
        container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#1e1e1e' },
        card: { backgroundColor: '#2b2b2b', padding: '30px', borderRadius: '8px', color: 'white', maxWidth: '400px', width: '100%' },
        form: { display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' },
        input: { padding: '10px', border: '1px solid #666', borderRadius: '4px', backgroundColor: '#444', color: 'white' },
        button: (loading) => ({
            padding: '10px', 
            backgroundColor: loading ? '#6c757d' : '#00cc99', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: loading ? 'not-allowed' : 'pointer'
        })
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={{ textAlign: 'center', color: '#00cc99' }}>Acesso ao CareHub</h2>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                
                <form onSubmit={handleLogin} style={styles.form}>
                    <input 
                        type="email" 
                        placeholder="E-mail" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        disabled={isLoading}
                        style={styles.input}
                    />
                    <input 
                        type="password" 
                        placeholder="Senha" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        disabled={isLoading}
                        style={styles.input}
                    />
                    <button type="submit" disabled={isLoading} style={styles.button(isLoading)}>
                        {isLoading ? 'Acessando...' : 'Entrar no Sistema'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;