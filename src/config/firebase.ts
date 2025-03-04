import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBZx_Qm86Mp3gV1IHuMXqqtofvkOqvZKm4",
    authDomain: "movie-explorer-19b16.firebaseapp.com",
    projectId: "movie-explorer-19b16",
    storageBucket: "movie-explorer-19b16.firebasestorage.app",
    messagingSenderId: "139601064611",
    appId: "1:139601064611:web:98e44d7b828d59c54a0516",
    measurementId: "G-RQZ50KFXSH"
};  

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(app);