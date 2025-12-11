import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { syncFavoritesOnLogin, clearFavorites, setFavorites } from "../features/favorites/favoritesSlice";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      const localFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

      if (user) {
        // Слияние локальных + серверных favorites
        await dispatch(syncFavoritesOnLogin({
          userId: user.uid,
          localFavorites
        }));
      } else {
        // Если гость → загружаем из localStorage
        dispatch(setFavorites(localFavorites));
      }

      setLoading(false);
    });

    return unsubscribe;
  }, [dispatch]);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ currentUser, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
