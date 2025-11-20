// carehub-frontend/src/firebase/config.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// 🚨 SUBSTITUA PELAS SUAS CHAVES PÚBLICAS REAIS DO FIREBASE 🚨
const firebaseConfig = {
    apiKey: "AIzaSyDYfho7jqxjFfUMPNHncEFyD_LfPAMsIZA",
    authDomain: "carehub-7ebbe.firebaseapp.com",
    projectId: "carehub-7ebbe",
    storageBucket: "carehub-7ebbe.firebasestorage.app",
    messagingSenderId: "762385175608",
    appId: "1:762385175608:web:28bb2fbd636d7f04c982cd",
    measurementId: "G-X8J26ZSEWS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Serviço de Autenticação do Firebase