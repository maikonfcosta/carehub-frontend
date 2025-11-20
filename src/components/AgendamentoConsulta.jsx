// carehub-frontend/src/components/AgendamentoConsulta.jsx

import React, { useState, useEffect } from 'react';
import api from '../api/api';
import CheckoutWrapper from './Pagamentos/CheckoutWrapper'; // Importa o componente de pagamento

// Define o valor fixo da consulta em centavos
const VALOR_CONSULTA_CENTAVOS = 15000; // R$ 150,00

function AgendamentoConsulta() {
  
  // Estados para dados do formulário
  const [agendamentoData, setAgendamentoData] = useState({
    pacienteId: '',
    medicoId: '',
    dataHora: '',
  });
  
  // Estado para armazenar o ID do agendamento criado (necessário para o pagamento)
  const [agendamentoCriadoId, setAgendamentoCriadoId] = useState(null); 
  
  // Estados para listas de seleção
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  
  // Estados para feedback e carregamento
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(true);

  // Carregar Pacientes e Médicos
  useEffect(() => {
    // ... (lógica de carregamento de dados omitida por brevidade, assumindo que está correta) ...
    async function fetchData() {
        try {
            const [pacientesResponse, medicosResponse] = await Promise.all([
                api.get('/pacientes'),
                api.get('/medicos')
            ]);
            setPacientes(pacientesResponse.data);
            setMedicos(medicosResponse.data);
            setLoading(false);
        } catch (err) {
            setErro("Erro ao carregar listas de pacientes/médicos. API indisponível?");
            setLoading(false);
        }
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgendamentoData(prev => ({ ...prev, [name]: value }));
  };

  // 🚨 LÓGICA DE AGENDAMENTO E TRANSIÇÃO PARA PAGAMENTO 🚨
  const handleAgendar = async (e) => {
    e.preventDefault();
    setMensagem('');
    setErro('');
    setAgendamentoCriadoId(null); // Limpa o ID anterior

    // Prepara o objeto para a API
    const dadosParaAPI = {
      paciente: { id: agendamentoData.pacienteId },
      medico: { id: agendamentoData.medicoId },
      dataHora: agendamentoData.dataHora + ':00' 
    };

    try {
      // 1. Cria o agendamento no Back-end
      const response = await api.post('/agendamentos', dadosParaAPI);
      
      // 2. Transição para o Pagamento: Armazena o ID e altera o estado
      setAgendamentoCriadoId(response.data.id);
      setMensagem(`Agendamento provisório criado! Prossiga para o pagamento de R$ 150,00.`);
      
    } catch (error) {
      // Trata erros (Conflito de Horário - 409)
      let msgErro = "Falha no agendamento: ";
      if (error.response) {
        msgErro += error.response.data.message || error.response.data.error || `Status ${error.response.status} (Erro de Servidor/Validação)`;
      } else {
        msgErro += "Erro de rede. Verifique o Back-end.";
      }
      setErro(msgErro);
    }
  };
  
  if (loading) return <h3 style={{ textAlign: 'center' }}>Carregando dados necessários para agendamento...</h3>;
  
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '20px auto', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Agendamento de Consulta</h2>
      
      {mensagem && <p style={{ color: 'green', border: '1px solid green', padding: '10px' }}>{mensagem}</p>}
      {erro && <p style={{ color: 'red', border: '1px solid red', padding: '10px' }}>{erro}</p>}

      {/* Alterna entre o Formulário de Agendamento e o Checkout */}
      {agendamentoCriadoId ? (
          // 3. SE O AGENDAMENTO FOI CRIADO: Exibe o componente de pagamento
          <div>
              <h3>Confirmação e Pagamento</h3>
              <p>Consulta ID: **{agendamentoCriadoId}**. Valor: **R$ 150,00**.</p>
              <CheckoutWrapper 
                  agendamentoId={agendamentoCriadoId} 
                  valorCentavos={VALOR_CONSULTA_CENTAVOS} 
              />
          </div>
      ) : (
          // 4. SE O AGENDAMENTO AINDA NÃO FOI CRIADO: Exibe o formulário de agendamento
          <form onSubmit={handleAgendar} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            <select name="pacienteId" value={agendamentoData.pacienteId} onChange={handleChange} required>
              <option value="">Selecione o Paciente</option>
              {pacientes.map(p => (<option key={p.id} value={p.id}>{p.nomeCompleto}</option>))}
            </select>

            <select name="medicoId" value={agendamentoData.medicoId} onChange={handleChange} required>
              <option value="">Selecione o Médico</option>
              {medicos.map(m => (<option key={m.id} value={m.id}>{m.nomeCompleto} ({m.especialidade})</option>))}
            </select>
            
            <label>
                Data e Hora da Consulta:
                <input 
                    type="datetime-local" 
                    name="dataHora" 
                    value={agendamentoData.dataHora} 
                    onChange={handleChange} 
                    required 
                    min={new Date().toISOString().slice(0, 16)}
                />
            </label>

            <button type="submit" style={{ padding: '10px', backgroundColor: '#e95420', color: 'white', border: 'none' }}>
              Agendar e Pagar (R$ 150,00)
            </button>
          </form>
      )}
    </div>
  );
}

export default AgendamentoConsulta;