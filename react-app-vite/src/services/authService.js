import { auth } from "../firebase/firebase";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

export function subscribeToAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

export function loginService(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signupService(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function logoutService() {
  return signOut(auth);
}
