// Import the functions you need from the SDKs you need
import { getApps, initializeApp, getApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLT9VQsltHAJUVax0UjWMk3ESOENkiIYY",
  authDomain: "care-25a64.firebaseapp.com",
  projectId: "care-25a64",
  storageBucket: "care-25a64.firebasestorage.app",
  messagingSenderId: "788387771466",
  appId: "1:788387771466:web:0c7f969b43073b87d0a2b3",
  measurementId: "G-MERNQH3Y87"
};

// Initialize Firebase (idempotent for Next.js)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export default app;
