// carehub-frontend/src/pages/TabelaMedicos.jsx

import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

function TabelaMedicos() {
    const [medicos, setMedicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});

    // Lista de especialidades para o dropdown de edição
    const especialidades = ["CARDIOLOGIA", "DERMATOLOGIA", "ENDOCRINOLOGIA", "ORTOPEDIA", "PEDIATRIA", "CLINICO_GERAL", "GINECOLOGIA", "OUTRO"];

    useEffect(() => {
        fetchMedicos();
    }, []);

    const fetchMedicos = async () => {
        setLoading(true);
        try {
            const response = await api.get('/medicos');
            setMedicos(response.data);
            setError(null);
        } catch (err) {
            setError("Erro ao carregar a lista de médicos. Verifique a API.");
        } finally {
            setLoading(false);
        }
    };

    // --- FUNÇÕES CRUD ---

    const handleEdit = (medico) => {
        setEditingId(medico.id);
        setEditData(medico);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            // Chamada PUT
            await api.put(`/medicos/${editingId}`, editData);
            setEditingId(null);
            fetchMedicos();
        } catch (err) {
            const msg = err.response?.data?.message || "Falha ao salvar. CRM pode ser duplicado.";
            alert(`Erro ao salvar: ${msg}`);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir este médico?")) return;
        
        try {
            // Chamada DELETE
            await api.delete(`/medicos/${id}`);
            fetchMedicos();
        } catch (err) {
            const msg = err.response?.data?.message || "Falha ao excluir.";
            alert(`Erro ao excluir: ${msg}`);
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    if (loading) return <h3>Carregando tabela de médicos...</h3>;
    if (error) return <h3 style={{ color: 'red' }}>Erro: {error}</h3>;

    return (
        <div style={styles.mainCard}>
            <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>Médicos Cadastrados</h1>
            
            <button 
                onClick={() => navigate('/cadastro/medico')}
                style={styles.addButton}
            >
                + Cadastrar Novo Médico
            </button>

            <table style={styles.table}>
                <thead>
                    <tr style={styles.trHeader}>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Nome Completo</th>
                        <th style={styles.th}>CRM</th>
                        <th style={styles.th}>Especialidade</th>
                        <th style={styles.th}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {medicos.map((medico) => (
                        <React.Fragment key={medico.id}>
                            {editingId === medico.id ? (
                                // Modo de Edição
                                <tr>
                                    <td style={styles.td}>{medico.id}</td>
                                    <td style={styles.td}><input type="text" name="nomeCompleto" value={editData.nomeCompleto} onChange={handleEditChange} style={styles.inputField} /></td>
                                    <td style={styles.td}><input type="text" name="crm" value={editData.crm} onChange={handleEditChange} style={styles.inputField} /></td>
                                    <td style={styles.td}>
                                        <select name="especialidade" value={editData.especialidade} onChange={handleEditChange} style={styles.selectField}>
                                            {especialidades.map(esp => (
                                                <option key={esp} value={esp}>{esp}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td style={styles.td}>
                                        <button onClick={handleSave} style={styles.saveButton}>Salvar</button>
                                        <button onClick={() => setEditingId(null)} style={styles.cancelButton}>Cancelar</button>
                                    </td>
                                </tr>
                            ) : (
                                // Modo de Visualização
                                <tr>
                                    <td style={styles.td}>{medico.id}</td>
                                    <td style={styles.td}>{medico.nomeCompleto}</td>
                                    <td style={styles.td}>{medico.crm}</td>
                                    <td style={styles.td}>{medico.especialidade}</td>
                                    <td style={styles.td}>
                                        <button onClick={() => handleEdit(medico)} style={styles.editButton}>Alterar</button>
                                        <button onClick={() => handleDelete(medico.id)} style={styles.deleteButton}>Excluir</button>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// 🚨 ESTILOS (Tema Escuro) 🚨
const styles = {
    mainCard: {
        padding: '20px',
        margin: '20px auto',
        border: '1px solid #444444', 
        borderRadius: '8px',
        backgroundColor: '#2b2b2b',
        color: 'white'
    },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '15px' },
    trHeader: { backgroundColor: '#333333' },
    th: { border: '1px solid #444444', padding: '10px', textAlign: 'left', backgroundColor: '#333333' },
    td: { border: '1px solid #444444', padding: '10px', verticalAlign: 'middle' },
    inputField: {
        backgroundColor: '#444444', 
        color: 'white',             
        border: '1px solid #666666',
        padding: '8px',
        borderRadius: '4px',
        width: '90%'
    },
    selectField: {
        backgroundColor: '#444444', 
        color: 'white',             
        border: '1px solid #666666',
        padding: '8px',
        borderRadius: '4px',
        width: '95%'
    },
    addButton: { padding: '10px 15px', backgroundColor: '#00cc99', color: 'white', border: 'none', borderRadius: '4px', marginBottom: '20px', cursor: 'pointer' },
    editButton: { padding: '5px 10px', backgroundColor: '#ffc107', color: '#333', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    deleteButton: { padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '5px' },
    saveButton: { padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    cancelButton: { padding: '5px 10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '5px' }
};

export default TabelaMedicos;