import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCSz7U8XmFISIu3UxgeVPO9821KrBaSDN8",
    authDomain: "toys-login-13c84.firebaseapp.com",
    projectId: "toys-login-13c84",
    storageBucket: "toys-login-13c84.appspot.com",
    messagingSenderId: "164202257812",
    appId: "1:164202257812:web:c791ac8569559cd27c8381"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);