// carehub-frontend/src/pages/ConsultasAgendadas.jsx

import React, { useState, useEffect } from 'react';
import api from '../api/api';

// Estilos de Tabela para consistência
const styles = {
    mainCard: { padding: '20px', margin: '20px auto', border: '1px solid #444', borderRadius: '8px', backgroundColor: '#2b2b2b', color: 'white' },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '15px' },
    th: { border: '1px solid #444', padding: '10px', textAlign: 'left', backgroundColor: '#333333' },
    td: { border: '1px solid #444', padding: '10px', verticalAlign: 'middle' },
    inputField: { backgroundColor: '#444444', color: 'white', border: '1px solid #666666', padding: '8px', borderRadius: '4px' }
};

function ConsultasAgendadas() {
    const [agendamentos, setAgendamentos] = useState([]);
    const [dataFiltro, setDataFiltro] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Carrega todos os agendamentos na inicialização
        fetchConsultas();
    }, []);

    const fetchConsultas = async (data = '') => {
        setLoading(true);
        setError(null);
        try {
            // Chamamos a API GET /agendamentos, futuramente com um parâmetro de filtro: /api/agendamentos?data=YYYY-MM-DD
            const response = await api.get('/agendamentos', {
                params: data ? { data: data } : {}
            });
            setAgendamentos(response.data);
        } catch (err) {
            setError("Erro ao carregar consultas agendadas.");
        } finally {
            setLoading(false);
        }
    };
    
    // Lógica para aplicar o filtro
    const handleFiltrar = (e) => {
        e.preventDefault();
        fetchConsultas(dataFiltro);
    };

    if (loading) return <h3>Carregando consultas...</h3>;

    return (
        <div style={styles.mainCard}>
            <h1>Consultas Agendadas</h1>

            <form onSubmit={handleFiltrar} style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <label style={{ color: '#00cc99' }}>Filtrar por Data:</label>
                <input 
                    type="date" 
                    value={dataFiltro} 
                    onChange={(e) => setDataFiltro(e.target.value)} 
                    style={styles.inputField}
                />
                <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Aplicar Filtro
                </button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <table style={styles.table}>
                <thead>
                    <tr style={{ backgroundColor: '#333333' }}>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Paciente</th>
                        <th style={styles.th}>Médico</th>
                        <th style={styles.th}>Data/Hora</th>
                        <th style={styles.th}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {agendamentos.length === 0 ? (
                        <tr><td colSpan="5" style={{...styles.td, textAlign: 'center'}}>Nenhuma consulta agendada.</td></tr>
                    ) : (
                        agendamentos.map(ag => (
                            <tr key={ag.id}>
                                <td style={styles.td}>{ag.id}</td>
                                <td style={styles.td}>{ag.paciente.nomeCompleto}</td>
                                <td style={styles.td}>{ag.medico.nomeCompleto} ({ag.medico.especialidade})</td>
                                <td style={styles.td}>{new Date(ag.dataHora).toLocaleString('pt-BR')}</td>
                                <td style={styles.td}>{ag.status}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ConsultasAgendadas;