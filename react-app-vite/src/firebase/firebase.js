// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5reH4MljusDdQa_VYVo5zmrEdB9jK2ns",
  authDomain: "react-app-vite-8301d.firebaseapp.com",
  projectId: "react-app-vite-8301d",
  storageBucket: "react-app-vite-8301d.firebasestorage.app",
  messagingSenderId: "529589780954",
  appId: "1:529589780954:web:e9c22f594cef3b73bb00e3",
  measurementId: "G-R6VHBGPQEP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app); 