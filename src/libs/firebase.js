// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "firbase-t.firebaseapp.com",
  projectId: "firbase-t",
  storageBucket: "firbase-t.appspot.com",
  messagingSenderId: "380890343961",
  appId: "1:380890343961:web:d89e1357ba8b6714d7d888"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);

// export const auth= getAuth()
export const storage = getStorage(app);