import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, memoryLocalCache } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5reH4MljusDdQa_VYVo5zmrEdB9jK2ns",
  authDomain: "react-app-vite-8301d.firebaseapp.com",
  projectId: "react-app-vite-8301d",
  storageBucket: "react-app-vite-8301d.appspot.com", 
  messagingSenderId: "529589780954",
  appId: "1:529589780954:web:e9c22f594cef3b73bb00e3",
  measurementId: "G-R6VHBGPQEP"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = initializeFirestore(app, {
  localCache: memoryLocalCache()
});
