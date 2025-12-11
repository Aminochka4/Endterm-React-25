import { doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function saveProfilePicture(uid, photoBase64) {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, { photoURL: photoBase64 }, { merge: true });

  localStorage.setItem(`photo_${uid}`, photoBase64);
}

export async function getProfile(uid) {
  const cached = localStorage.getItem(`photo_${uid}`);
  if (cached) {
    return { photoURL: cached };
  }

  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);
  return snap.exists() ? snap.data() : null;
}

export function subscribeProfile(uid, callback) {
  const userRef = doc(db, "users", uid);
  return onSnapshot(userRef, (snap) => {
    callback(snap.data());
  });
}

export async function getProfileFavorites(uid) {
  const cached = localStorage.getItem(`favorites_${uid}`);
  if (cached) return JSON.parse(cached);

  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);
  const favorites = snap.exists() && snap.data().favorites ? snap.data().favorites : [];
  return favorites;
}

export async function saveProfileFavorites(uid, favorites) {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, { favorites }, { merge: true });
  localStorage.setItem(`favorites_${uid}`, JSON.stringify(favorites));
}