import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCLT9VQsltHAJUVax0UjWMk3ESOENkiIYY",
  authDomain: "care-25a64.firebaseapp.com",
  projectId: "care-25a64",
  storageBucket: "care-25a64.firebasestorage.app",
  messagingSenderId: "788387771466",
  appId: "1:788387771466:web:0c7f969b43073b87d0a2b3",
  measurementId: "G-MERNQH3Y87",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
