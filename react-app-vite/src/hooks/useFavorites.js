import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
  setFavorites,
  markMerged,
} from "../features/items/favoritesSlice";
import { useAuth } from "../contexts/AuthContext";
import {
  getProfileFavorites,
  saveProfileFavorites,
} from "../services/profileService";

export function useFavorites() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const favorites = useSelector((state) => state.favorites?.favorites || []);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadFavorites = useCallback(async () => {
    if (!user) {
      const local = localStorage.getItem("local_favorites");
      dispatch(setFavorites(local ? JSON.parse(local) : []));
      return;
    }

    try {
      setLoading(true);
      setError("");

      const serverFavorites = await getProfileFavorites(user.uid);
      const local = JSON.parse(localStorage.getItem("local_favorites") || "[]");

      let merged = serverFavorites;

      if (local.length > 0) {
        merged = [...new Set([...serverFavorites, ...local])];
        localStorage.removeItem("local_favorites");
        dispatch(markMerged());
      }

      dispatch(setFavorites(merged));
      await saveProfileFavorites(user.uid, merged);

    } catch (err) {
      console.error("Failed to load favorites:", err);
      setError("Failed to load favorites: " + err.message);
    } finally {
      setLoading(false);
    }
  }, [user, dispatch]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const toggleFavorite = async (id) => {
    let newFavorites;

    if (favorites.includes(id)) {
      newFavorites = favorites.filter((fav) => fav !== id);
      dispatch(removeFavorite(id));
    } else {
      newFavorites = [...favorites, id];
      dispatch(addFavorite(id));
    }

    try {
      if (user) {
        await saveProfileFavorites(user.uid, newFavorites);
      } else {
        localStorage.setItem("local_favorites", JSON.stringify(newFavorites));
      }
    } catch (err) {
      console.error("Error saving favorites:", err);
      setError("Failed to save favorites: " + err.message);
    }
  };

  return { favorites, toggleFavorite, loading, error };
}
