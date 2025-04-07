// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARrdRTN6VgmyHj2VtQ-LJgxYdcMagu-Ig",
  authDomain: "tosh-fi.firebaseapp.com",
  projectId: "tosh-fi",
  storageBucket: "tosh-fi.firebasestorage.app",
  messagingSenderId: "67629115417",
  appId: "1:67629115417:web:f798514c6e5e93f4c8a288",
  measurementId: "G-YFH8GDDVS8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, doc, setDoc };
