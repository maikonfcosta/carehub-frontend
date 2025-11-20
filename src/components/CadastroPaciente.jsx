// carehub-frontend/src/components/CadastroPaciente.jsx

import React, { useState } from 'react';
import api from '../api/api';

/**
 * Componente para o formulário de cadastro de novos pacientes,
 * incluindo a busca de endereço via API Java (ViaCEP).
 */
function CadastroPaciente({ onCadastroSucesso }) {
  
  // 1. Estado para armazenar os dados do formulário
  const [pacienteData, setPacienteData] = useState({
    nomeCompleto: '',
    cpf: '',
    telefone: '',
    email: '',
    cep: '',
    logradouro: '',
    bairro: '',
    localidade: '',
    uf: '',
    numero: '' 
  });
  
  // 2. Estados para feedback e controle
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSearchingCep, setIsSearchingCep] = useState(false);

  // Manipula mudanças em todos os campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPacienteData({
      ...pacienteData,
      [name]: value      
    });
  };

  // 3. Lógica de BUSCA VIA CEP (Acionada ao sair do campo CEP)
  const handleCepBlur = async () => {
    const cep = pacienteData.cep.replace(/\D/g, ''); // Remove não-dígitos
    if (cep.length !== 8) return;

    setIsSearchingCep(true);
    setErro('');
    setMensagem('');

    try {
      // Chama o endpoint da API Java: /api/cep/{cep}
      const response = await api.get(`/cep/${cep}`);
      const dadosEndereco = response.data;

      if (dadosEndereco.erro) {
        setErro("CEP não encontrado. Preencha o endereço manualmente.");
        // Limpa campos automáticos
        setPacienteData(prev => ({ ...prev, logradouro: '', bairro: '', localidade: '', uf: '' }));
      } else {
        // Preenche automaticamente o endereço
        setPacienteData(prev => ({
          ...prev,
          logradouro: dadosEndereco.logradouro,
          bairro: dadosEndereco.bairro,
          localidade: dadosEndereco.localidade,
          uf: dadosEndereco.uf
        }));
        setMensagem("Endereço preenchido automaticamente!");
      }

    } catch (error) {
      setErro("Falha ao buscar CEP. Verifique a conexão com a API.");
    } finally {
      setIsSearchingCep(false);
    }
  };

  // 4. Lógica de SUBMISSÃO (Envio do Paciente)
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setMensagem('');
    setErro('');
    setIsSubmitting(true);

    try {
      // Cria um objeto de paciente sem campos extras (como 'numero') para a API
      const { numero, ...dadosParaAPI } = pacienteData;
      
      const response = await api.post('/pacientes', dadosParaAPI);
      
      setMensagem(`Paciente ${response.data.nomeCompleto} cadastrado com sucesso!`);
      
      setPacienteData({ nomeCompleto: '', cpf: '', telefone: '', email: '', cep: '', logradouro: '', bairro: '', localidade: '', uf: '', numero: '' }); 
      
      if (onCadastroSucesso) {
        onCadastroSucesso();
      }

    } catch (error) {
      // 🚨 TRATAMENTO DE ERROS OTIMIZADO 🚨
      let msgErro;
      let status = error.response ? error.response.status : 'Desconhecido';
      
      if (error.response) {
        const data = error.response.data;
        
        // Tenta ler a mensagem detalhada (do ResponseStatusException)
        msgErro = data.message; 
        
        // Usa o texto do status HTTP como fallback
        if (!msgErro) {
            msgErro = data.error || `Status ${status}: Falha de validação (Conflito)`;
        }
        
      } else {
        msgErro = "Nenhuma resposta do servidor. API pode estar offline.";
      }
      
      setErro(`Falha no cadastro: ${msgErro}`);
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.mainCard}> {/* 🚨 Fundo do CARD */}
      <h2>Cadastro de Paciente</h2>
      
      {/* Exibição de Mensagens */}
      {mensagem && <p style={{ color: 'lightgreen', border: '1px solid lightgreen', padding: '10px' }}>{mensagem}</p>}
      {erro && <p style={{ color: 'red', border: '1px solid red', padding: '10px' }}>{erro}</p>}

      <form onSubmit={handleSubmit} style={styles.formGrid}>
        
        {/* Dados Pessoais */}
        <div style={styles.sectionTitle}>Dados Pessoais</div>
        <input type="text" name="nomeCompleto" placeholder="Nome Completo" value={pacienteData.nomeCompleto} onChange={handleChange} required disabled={isSubmitting} style={styles.inputField} />
        <input type="text" name="cpf" placeholder="CPF (Apenas números)" value={pacienteData.cpf} onChange={handleChange} maxLength="11" required disabled={isSubmitting} style={styles.inputField} />
        <input type="text" name="telefone" placeholder="Telefone" value={pacienteData.telefone} onChange={handleChange} disabled={isSubmitting} style={styles.inputField} />
        <input type="email" name="email" placeholder="E-mail" value={pacienteData.email} onChange={handleChange} required disabled={isSubmitting} style={styles.inputField} />

        {/* Endereço (ViaCEP) */}
        <div style={styles.sectionTitle}>Endereço</div>
        
        <input 
          type="text" 
          name="cep" 
          placeholder="CEP (Ex: 01001000)" 
          value={pacienteData.cep} 
          onChange={handleChange}
          onBlur={handleCepBlur} // Busca ao sair do campo
          disabled={isSubmitting || isSearchingCep}
          maxLength="8"
          style={styles.inputField}
        />
        
        <button 
          type="button" 
          onClick={handleCepBlur} 
          disabled={isSubmitting || isSearchingCep}
          style={styles.searchButton(isSearchingCep)} // Estilo dinâmico
        >
          {isSearchingCep ? 'Buscando...' : 'Buscar Endereço'}
        </button>
        
        <input type="text" name="logradouro" placeholder="Rua/Avenida" value={pacienteData.logradouro} onChange={handleChange} disabled={isSubmitting || isSearchingCep} style={{...styles.inputField, gridColumn: 'span 2'}}/>
        <input type="text" name="numero" placeholder="Número" value={pacienteData.numero} onChange={handleChange} required disabled={isSubmitting || isSearchingCep} style={styles.inputField} />
        <input type="text" name="bairro" placeholder="Bairro" value={pacienteData.bairro} onChange={handleChange} disabled={isSubmitting || isSearchingCep} style={styles.inputField} />
        <input type="text" name="localidade" placeholder="Cidade" value={pacienteData.localidade} onChange={handleChange} disabled={isSubmitting || isSearchingCep} style={styles.inputField} />
        <input type="text" name="uf" placeholder="UF" value={pacienteData.uf} onChange={handleChange} disabled={isSubmitting || isSearchingCep} maxLength="2" style={styles.inputField} />
        
        {/* Botão de Submissão */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          style={styles.submitButton(isSubmitting)}>
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}

export default CadastroPaciente;

// 🚨 ESTILOS PARA TEMA ESCURO 🚨
const styles = {
    // Fundo do CARD principal do formulário (Combina com o fundo do menu lateral)
    mainCard: {
        padding: '20px',
        maxWidth: '600px',
        margin: '20px auto',
        border: '1px solid #444444', 
        borderRadius: '8px',
        backgroundColor: '#2b2b2b', // Fundo escuro do card
        color: 'white' // Garante que labels e texto normal sejam brancos
    },
    formGrid: {
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '10px',
    },
    sectionTitle: {
        gridColumn: 'span 2', 
        textAlign: 'left', 
        fontWeight: 'bold', 
        marginTop: '10px',
        marginBottom: '5px',
        fontSize: '1.1em',
        color: '#00cc99' // Cor de destaque
    },
    // Fundo do CAMPO DE INPUT
    inputField: {
        backgroundColor: '#444444', 
        color: 'white',             
        border: '1px solid #666666',
        padding: '10px',
        borderRadius: '4px',
    },
    // Estilo dinâmico para o botão de busca
    searchButton: (isLoading) => ({
        padding: '10px',
        backgroundColor: isLoading ? '#ccc' : '#28a745', 
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: isLoading ? 'not-allowed' : 'pointer',
    }),
    // Estilo dinâmico para o botão de submissão
    submitButton: (isSubmitting) => ({
        gridColumn: 'span 2', 
        padding: '10px', 
        backgroundColor: isSubmitting ? '#ccc' : '#007bff', 
        color: 'white', 
        border: 'none', 
        borderRadius: '4px',
        cursor: isSubmitting ? 'not-allowed' : 'pointer', 
        marginTop: '20px'
    })
};