// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXqX5XgxXYvqnWn22LHyPUzik3GJiloOk",
  authDomain: "cryptotracker-f2f51.firebaseapp.com",
  projectId: "cryptotracker-f2f51",
  storageBucket: "cryptotracker-f2f51.appspot.com",
  messagingSenderId: "823543712849",
  appId: "1:823543712849:web:f5d9141b16114d27dabc70",
  measurementId: "G-MJY346987M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);