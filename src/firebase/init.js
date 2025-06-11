// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQ19K-TSLQCVl4syTUqZ9HGr9FKm8Auzs",
  authDomain: "fir-1-3f13b.firebaseapp.com",
  projectId: "fir-1-3f13b",
  storageBucket: "fir-1-3f13b.firebasestorage.app",
  messagingSenderId: "975267565230",
  appId: "1:975267565230:web:69a8c0309a95ba539e673f",
  measurementId: "G-JE7940B6F4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const analytics = getAnalytics(app);
