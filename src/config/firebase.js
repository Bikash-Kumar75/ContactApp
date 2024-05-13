// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA-ImOR8zFxed4F0g3HAJOS6UXdArB39uI",
    authDomain: "contactapp-46d35.firebaseapp.com",
    projectId: "contactapp-46d35",
    storageBucket: "contactapp-46d35.appspot.com",
    messagingSenderId: "835050288154",
    appId: "1:835050288154:web:23f003dd0a7769e61dcda3",
    measurementId: "G-8RMYWLL9SQ"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
