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
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);

  return snap.exists() && snap.data().favorites
    ? snap.data().favorites
    : [];
}


export async function saveProfileFavorites(uid, favorites) {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, { favorites }, { merge: true });
  localStorage.removeItem("local_favorites");

}