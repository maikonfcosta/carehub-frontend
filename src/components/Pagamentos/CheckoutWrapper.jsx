// carehub-frontend/src/components/Pagamentos/CheckoutWrapper.jsx

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'; // O formulário real virá aqui

// Carrega a chave pública do Stripe
// A variável VITE_STRIPE_PUBLIC_KEY é lida do arquivo .env
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function CheckoutWrapper({ agendamentoId, valorCentavos }) {
    if (!stripePromise) {
        return <div>Erro: Chave pública do Stripe não configurada.</div>;
    }

    return (
        <Elements stripe={stripePromise}>
            {/* O formulário de cartão real */}
            <CheckoutForm 
                agendamentoId={agendamentoId} 
                valorCentavos={valorCentavos} 
            />
        </Elements>
    );
}

export default CheckoutWrapper;