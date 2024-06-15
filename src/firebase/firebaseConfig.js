// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMc2uvh_xJSXITmoxar5zS9TfDgt7T_Ug",
  authDomain: "recipe-6af4f.firebaseapp.com",
  projectId: "recipe-6af4f",
  storageBucket: "recipe-6af4f.appspot.com",
  messagingSenderId: "31714562864",
  appId: "1:31714562864:web:0317a772c415ebacb4eef5",
  measurementId: "G-4B8SFDBDMR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);