
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDRr20dGXfagBY986N0UoLqo9skYW9kFck",
    authDomain: "marvel-quiz-63ba8.firebaseapp.com",
    projectId: "marvel-quiz-63ba8",
    storageBucket: "marvel-quiz-63ba8.appspot.com",
    messagingSenderId: "842901040930",
    appId: "1:842901040930:web:1d92e2301856ea932a7f7b"
};
// initialize app
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)