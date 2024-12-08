// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKXjiQcNqZSIjdoay8dRvYplFpAxXJN64",
  authDomain: "markitup-167bf.firebaseapp.com",
  projectId: "markitup-167bf",
  storageBucket: "markitup-167bf.firebasestorage.app",
  messagingSenderId: "855229053541",
  appId: "1:855229053541:web:c5d6554d5143d449dfe48c",
  measurementId: "G-WLSGY2WSF0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
