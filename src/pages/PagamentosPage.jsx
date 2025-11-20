// carehub-frontend/src/pages/PagamentosPage.jsx

import React, { useState, useEffect } from 'react';
import api from '../api/api';

// 🚨 ESTILOS PARA TEMA ESCURO 🚨
const styles = {
    mainCard: { 
        padding: '20px', 
        margin: '20px auto', 
        border: '1px solid #444', 
        borderRadius: '8px', 
        backgroundColor: '#2b2b2b', 
        color: 'white' 
    },
    table: { 
        width: '100%', 
        borderCollapse: 'collapse', 
        marginTop: '15px' 
    },
    th: { 
        border: '1px solid #444', 
        padding: '10px', 
        textAlign: 'left', 
        backgroundColor: '#333333' 
    },
    td: { 
        border: '1px solid #444', 
        padding: '10px', 
        verticalAlign: 'middle' 
    },
};

function PagamentosPage() {
    const [pagamentos, setPagamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPagamentos();
    }, []);

    const fetchPagamentos = async () => {
        setLoading(true);
        try {
            const response = await api.get('/relatorios/pagamentos');
            
            // 🚨 CORREÇÃO CRÍTICA: Verifica se a resposta é um ARRAY.
            if (Array.isArray(response.data)) {
                setPagamentos(response.data);
                setError(null);
            } else {
                // Se a API retornar um objeto de erro (como o seu "Requests without an origin..."), exibe a falha.
                const errMsg = response.data?.message || "Erro inesperado: O servidor retornou um objeto inválido.";
                setError(errMsg);
                setPagamentos([]); // Garante que a lista esteja vazia
            }
            
        } catch (err) {
            // ... (restante da lógica de catch) ...
        } finally {
            setLoading(false);
        }
    };
    
    if (loading) return <div style={styles.mainCard}><h3>Carregando histórico de pagamentos...</h3></div>;
    
    return (
        <div style={styles.mainCard}>
            <h1>Consulta de Pagamentos</h1>
            <p style={{ color: '#00cc99' }}>Relatório de transações realizadas.</p>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <table style={styles.table}>
                <thead>
                    <tr style={{ backgroundColor: '#333333' }}>
                        <th style={styles.th}>ID Pagamento</th>
                        <th style={styles.th}>ID Consulta</th>
                        <th style={styles.th}>Paciente</th>
                        <th style={styles.th}>Data Transação</th>
                        <th style={styles.th}>Valor</th>
                        <th style={styles.th}>Status</th>
                        <th style={styles.th}>ID Transação (Stripe)</th>
                    </tr>
                </thead>
                <tbody>
                    {pagamentos.length === 0 ? (
                        <tr><td colSpan="7" style={{...styles.td, textAlign: 'center'}}>Nenhum pagamento encontrado.</td></tr>
                    ) : (
                        pagamentos.map(p => (
                            <tr key={p.id}>
                                <td style={styles.td}>{p.id}</td>
                                <td style={styles.td}><a href={`/agendamento/${p.agendamentoId}`} style={{ color: '#007bff' }}>{p.agendamentoId}</a></td> 
                                <td style={styles.td}>{p.pacienteNome}</td>
                                {/* Formatação da data: O Back-end envia a data como String ISO */}
                                <td style={styles.td}>{new Date(p.dataTransacao).toLocaleString('pt-BR')}</td>
                                <td style={styles.td}>R$ {p.valor.toFixed(2)}</td>
                                <td style={styles.td}>{p.status}</td>
                                <td style={styles.td}>{p.transacaoId}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default PagamentosPage;