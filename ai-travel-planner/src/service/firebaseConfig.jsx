// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBd3NPgAViUMUZXpx-Rl5oInefSRbkgeM",
  authDomain: "ai-trip-planner-a3056.firebaseapp.com",
  projectId: "ai-trip-planner-a3056",
  storageBucket: "ai-trip-planner-a3056.firebasestorage.app",
  messagingSenderId: "811191413544",
  appId: "1:811191413544:web:c8769ee7431f42581e7e1d",
  measurementId: "G-2086M5FTHL"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);
// const analytics = getAnalytics(app);