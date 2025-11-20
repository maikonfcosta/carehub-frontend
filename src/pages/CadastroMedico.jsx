// carehub-frontend/src/pages/CadastroMedico.jsx (FINAL)

import React, { useState } from 'react';
import api from '../api/api';

// Lista de especialidades (do Enum do Back-end)
const ESPECIALIDADES = ["CARDIOLOGIA", "DERMATOLOGIA", "ENDOCRINOLOGIA", "ORTOPEDIA", "PEDIATRIA", "CLINICO_GERAL", "GINECOLOGIA", "OUTRO"];

function CadastroMedico() {
    
    // Estado para armazenar os dados do formulário
    const [medicoData, setMedicoData] = useState({
        nomeCompleto: '',
        crm: '',
        telefone: '',
        email: '',
        especialidade: 'CLINICO_GERAL' 
    });
    
    // Estados para feedback
    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMedicoData({ ...medicoData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setMensagem('');
        setErro('');
        setIsSubmitting(true);

        try {
            // Chamada POST para o endpoint /api/medicos
            await api.post('/medicos', medicoData);
            
            setMensagem(`Médico(a) ${medicoData.nomeCompleto} cadastrado(a) com sucesso!`);
            
            // Limpa o formulário
            setMedicoData({ nomeCompleto: '', crm: '', telefone: '', email: '', especialidade: 'CLINICO_GERAL' }); 

        } catch (error) {
            let msgErro;
            if (error.response) {
                msgErro = error.response.data?.message || error.response.data?.error || `Falha de validação (Status ${error.response.status}).`;
            } else {
                msgErro = "Erro de rede. Verifique a API.";
            }
            setErro(`Falha no cadastro: ${msgErro}`);
            
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={styles.mainCard}>
            <h2>Cadastro de Médico</h2>
            
            {mensagem && <p style={styles.messageSuccess}>{mensagem}</p>}
            {erro && <p style={styles.messageError}>{erro}</p>}

            <form onSubmit={handleSubmit} style={styles.formGrid}>
                
                <div style={styles.sectionTitle}>Dados do Médico</div>
                <input type="text" name="nomeCompleto" placeholder="Nome Completo" value={medicoData.nomeCompleto} onChange={handleChange} required disabled={isSubmitting} style={styles.inputField} />
                <input type="text" name="crm" placeholder="CRM" value={medicoData.crm} onChange={handleChange} required disabled={isSubmitting} style={styles.inputField} />
                <input type="text" name="telefone" placeholder="Telefone" value={medicoData.telefone} onChange={handleChange} required disabled={isSubmitting} style={styles.inputField} />
                <input type="email" name="email" placeholder="E-mail" value={medicoData.email} onChange={handleChange} required disabled={isSubmitting} style={styles.inputField} />

                <div style={styles.sectionTitle}>Especialidade</div>
                <select name="especialidade" value={medicoData.especialidade} onChange={handleChange} required disabled={isSubmitting} style={styles.selectField}>
                    {ESPECIALIDADES.map(esp => (
                        <option key={esp} value={esp}>{esp}</option>
                    ))}
                </select>

                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    style={styles.submitButton(isSubmitting)}>
                    {isSubmitting ? 'Cadastrando...' : 'Cadastrar Médico'}
                </button>
            </form>
        </div>
    );
}

export default CadastroMedico;

// 🚨 ESTILOS PARA TEMA ESCURO (Consistência) 🚨
const styles = {
    mainCard: { padding: '20px', maxWidth: '600px', margin: '20px auto', border: '1px solid #444', borderRadius: '8px', backgroundColor: '#2b2b2b', color: 'white' },
    formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
    sectionTitle: { gridColumn: 'span 2', textAlign: 'left', fontWeight: 'bold', marginTop: '10px', marginBottom: '5px', fontSize: '1.1em', color: '#00cc99' },
    inputField: { backgroundColor: '#444444', color: 'white', border: '1px solid #666666', padding: '10px', borderRadius: '4px' },
    selectField: { backgroundColor: '#444444', color: 'white', border: '1px solid #666666', padding: '10px', borderRadius: '4px', gridColumn: 'span 2' },
    submitButton: (isSubmitting) => ({
        gridColumn: 'span 2', padding: '10px', backgroundColor: isSubmitting ? '#ccc' : '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: isSubmitting ? 'not-allowed' : 'pointer', marginTop: '20px'
    }),
    messageSuccess: { color: 'lightgreen', border: '1px solid lightgreen', padding: '10px' },
    messageError: { color: 'red', border: '1px solid red', padding: '10px' }
};