// carehub-frontend/src/pages/TabelaPacientes.jsx

import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

function TabelaPacientes() {
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Estado para controle de Edição (ID do paciente sendo editado)
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});

    useEffect(() => {
        fetchPacientes();
    }, []);

    const fetchPacientes = async () => {
        setLoading(true);
        try {
            const response = await api.get('/pacientes');
            setPacientes(response.data);
            setError(null);
        } catch (err) {
            setError("Erro ao carregar a lista de pacientes. Verifique a API.");
        } finally {
            setLoading(false);
        }
    };

    // --- FUNÇÕES CRUD ---

    const handleEdit = (paciente) => {
        setEditingId(paciente.id);
        // Garante que o estado de edição tenha todos os campos necessários
        setEditData({
            id: paciente.id,
            nomeCompleto: paciente.nomeCompleto,
            cpf: paciente.cpf,
            email: paciente.email,
            telefone: paciente.telefone,
            cep: paciente.cep,
            logradouro: paciente.logradouro,
            bairro: paciente.bairro,
            localidade: paciente.localidade,
            uf: paciente.uf,
        }); 
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            // Chamada PUT para atualizar (endpoint: /api/pacientes/{id})
            await api.put(`/pacientes/${editingId}`, editData);
            setEditingId(null); // Sai do modo de edição
            fetchPacientes(); // Recarrega os dados
        } catch (err) {
            const msg = err.response?.data?.message || "Falha ao salvar. CPF pode ser duplicado.";
            alert(`Erro ao salvar: ${msg}`);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir este paciente?")) return;
        
        try {
            // Chamada DELETE
            await api.delete(`/pacientes/${id}`);
            fetchPacientes(); // Recarrega a lista após exclusão
        } catch (err) {
            const msg = err.response?.data?.message || "Falha ao excluir.";
            alert(`Erro ao excluir: ${msg}`);
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    if (loading) return <h3>Carregando tabela de pacientes...</h3>;
    if (error) return <h3 style={{ color: 'red' }}>Erro: {error}</h3>;

    return (
        <div style={styles.mainCard}>
            <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>Pacientes Cadastrados</h1>
            
            {/* Botão de Cadastro */}
            <button 
                onClick={() => navigate('/cadastro/paciente')}
                style={styles.addButton}
            >
                + Cadastrar Novo Paciente
            </button>

            <table style={styles.table}>
                <thead>
                    <tr style={styles.trHeader}>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Nome Completo</th>
                        <th style={styles.th}>CPF</th>
                        <th style={styles.th}>Telefone</th>
                        <th style={styles.th}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {pacientes.map((paciente) => (
                        <React.Fragment key={paciente.id}>
                            {editingId === paciente.id ? (
                                // Modo de Edição (exibe mais campos)
                                <tr>
                                    <td style={styles.td}>{paciente.id}</td>
                                    <td style={styles.td}><input type="text" name="nomeCompleto" value={editData.nomeCompleto} onChange={handleEditChange} style={styles.inputField} /></td>
                                    <td style={styles.td}><input type="text" name="cpf" value={editData.cpf} onChange={handleEditChange} style={styles.inputField} /></td>
                                    <td style={styles.td}><input type="text" name="telefone" value={editData.telefone} onChange={handleEditChange} style={styles.inputField} /></td>
                                    <td style={styles.td}>
                                        <button onClick={handleSave} style={styles.saveButton}>Salvar</button>
                                        <button onClick={() => setEditingId(null)} style={styles.cancelButton}>Cancelar</button>
                                    </td>
                                </tr>
                            ) : (
                                // Modo de Visualização
                                <tr>
                                    <td style={styles.td}>{paciente.id}</td>
                                    <td style={styles.td}>{paciente.nomeCompleto}</td>
                                    <td style={styles.td}>{paciente.cpf}</td>
                                    <td style={styles.td}>{paciente.telefone}</td>
                                    <td style={styles.td}>
                                        <button onClick={() => handleEdit(paciente)} style={styles.editButton}>Alterar</button>
                                        <button onClick={() => handleDelete(paciente.id)} style={styles.deleteButton}>Excluir</button>
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

// 🚨 ESTILOS PARA TEMA ESCURO (Consistência com CadastroPaciente.jsx) 🚨
const styles = {
    mainCard: {
        padding: '20px',
        margin: '20px auto',
        border: '1px solid #444444', 
        borderRadius: '8px',
        backgroundColor: '#2b2b2b', // Fundo escuro do card
        color: 'white'
    },
    table: {
        width: '100%', 
        borderCollapse: 'collapse',
        marginTop: '15px'
    },
    trHeader: {
        backgroundColor: '#333333',
    },
    th: { 
        border: '1px solid #444444', 
        padding: '10px', 
        textAlign: 'left', 
        backgroundColor: '#333333' // Fundo do cabeçalho da tabela
    },
    td: { 
        border: '1px solid #444444', 
        padding: '10px',
        verticalAlign: 'middle' // Alinha o conteúdo verticalmente
    },
    inputField: {
        backgroundColor: '#444444', 
        color: 'white',             
        border: '1px solid #666666',
        padding: '8px',
        borderRadius: '4px',
        width: '90%'
    },
    addButton: {
        padding: '10px 15px', 
        backgroundColor: '#00cc99', // Verde para 'Adicionar'
        color: 'white', 
        border: 'none', 
        borderRadius: '4px', 
        marginBottom: '20px', 
        cursor: 'pointer'
    },
    editButton: {
        padding: '5px 10px', 
        backgroundColor: '#ffc107', // Amarelo para 'Alterar'
        color: '#333', 
        border: 'none', 
        borderRadius: '4px', 
        cursor: 'pointer'
    },
    deleteButton: {
        padding: '5px 10px', 
        backgroundColor: '#dc3545', // Vermelho para 'Excluir'
        color: 'white', 
        border: 'none', 
        borderRadius: '4px', 
        cursor: 'pointer',
        marginLeft: '5px'
    },
    saveButton: {
        padding: '5px 10px', 
        backgroundColor: '#007bff', // Azul para 'Salvar'
        color: 'white', 
        border: 'none', 
        borderRadius: '4px', 
        cursor: 'pointer'
    },
    cancelButton: {
        padding: '5px 10px', 
        backgroundColor: '#6c757d', // Cinza para 'Cancelar'
        color: 'white', 
        border: 'none', 
        borderRadius: '4px', 
        cursor: 'pointer',
        marginLeft: '5px'
    }
};

export default TabelaPacientes;