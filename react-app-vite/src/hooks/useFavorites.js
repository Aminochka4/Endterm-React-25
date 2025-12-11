import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite, setFavorites, markMerged } from "../features/items/favoritesSlice";
import { useAuth } from "../contexts/AuthContext";
import { getProfileFavorites, saveProfileFavorites } from "../services/profileService";

export function useFavorites() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const favorites = useSelector((state) => state.favorites?.favorites || []);

  useEffect(() => {
    if (!user) {
      const local = localStorage.getItem("local_favorites");
      dispatch(setFavorites(local ? JSON.parse(local) : []));
      return;
    }

    const mergeFavorites = async () => {
      const serverFavorites = await getProfileFavorites(user.uid);
      const local = localStorage.getItem("local_favorites");
      let merged = serverFavorites;

      if (local) {
        const localFavorites = JSON.parse(local);
        merged = Array.from(new Set([...serverFavorites, ...localFavorites]));
        localStorage.removeItem("local_favorites");
        dispatch(markMerged());
      }

      dispatch(setFavorites(merged));
      await saveProfileFavorites(user.uid, merged);
    };

    mergeFavorites();
  }, [user, dispatch]);

  const toggleFavorite = async (id) => {
    let newFavorites;
    if (favorites.includes(id)) {
      dispatch(removeFavorite(id));
      newFavorites = favorites.filter(fav => fav !== id);
    } else {
      dispatch(addFavorite(id));
      newFavorites = [...favorites, id];
    }

    if (user) {
      await saveProfileFavorites(user.uid, newFavorites);
    } else {
      localStorage.setItem("local_favorites", JSON.stringify(newFavorites));
    }
  };

  return { favorites, toggleFavorite };
}
