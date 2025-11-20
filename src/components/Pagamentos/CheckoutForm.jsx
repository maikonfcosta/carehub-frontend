// carehub-frontend/src/components/Pagamentos/CheckoutForm.jsx

import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import api from '../../api/api';

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: { fontSize: "16px", color: "#424770", "::placeholder": { color: "#aab7c4" } },
        invalid: { iconColor: "#fa755a", color: "#fa755a" }
    },
    hidePostalCode: true // Oculta o campo de CEP/Código Postal do Stripe, usamos o ViaCEP
}

function CheckoutForm({ agendamentoId, valorCentavos }) {
    const [statusMensagem, setStatusMensagem] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const stripe = useStripe();
    const elements = useElements();

    const valorMonetario = (valorCentavos / 100).toFixed(2);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!stripe || !elements) {
            return; // Stripe.js ainda não carregado
        }
        
        setIsLoading(true);
        setStatusMensagem('Processando pagamento...');

        // 1. Cria o Token do Cartão com os dados inseridos
        const cardElement = elements.getElement(CardElement);
        const { error, token } = await stripe.createToken(cardElement);

        if (error) {
            setStatusMensagem('Erro no Cartão: ' + error.message);
            setIsLoading(false);
            return;
        }

        // 2. Envia o Token e os detalhes da transação para o SEU BACK-END
        try {
            const response = await api.post('/pagamentos/processar', {
                token: token.id, // O ID do token gerado
                agendamentoId: agendamentoId,
                valorCentavos: valorCentavos
            });

            // 3. Sucesso (Status 200 do seu Back-end)
            setStatusMensagem(`Pagamento Sucedido! ${response.data}`);
            cardElement.clear(); // Limpa os campos após o sucesso

        } catch (apiError) {
            // 4. Erro do SEU BACK-END (Pagamento recusado pelo Stripe ou erro de validação)
            const msg = apiError.response?.data || apiError.message;
            setStatusMensagem(`Falha no Pagamento: ${msg}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #007bff', borderRadius: '5px' }}>
            <h3>Valor a Pagar: R$ {valorMonetario}</h3>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                
                {/* O Elemento de Cartão do Stripe */}
                <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
                    <CardElement options={CARD_OPTIONS} />
                </div>
                
                <button type="submit" disabled={!stripe || isLoading} style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
                    {isLoading ? 'Processando...' : 'Confirmar Pagamento'}
                </button>
            </form>

            {statusMensagem && (
                <p style={{ marginTop: '10px', color: statusMensagem.includes('Sucedido') ? 'green' : 'red' }}>
                    {statusMensagem}
                </p>
            )}
        </div>
    );
}

export default CheckoutForm;