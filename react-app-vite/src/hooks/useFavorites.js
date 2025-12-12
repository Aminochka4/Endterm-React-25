import { useEffect } from "react";
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

  // ------------------------------
  // LOAD FAVORITES ON LOGIN / LOGOUT
  // ------------------------------
  useEffect(() => {
    if (!user) {
      // Guest
      const local = localStorage.getItem("local_favorites");
      dispatch(setFavorites(local ? JSON.parse(local) : []));
      return;
    }

    // Logged-in user
    const mergeFavorites = async () => {
      const serverFavorites = await getProfileFavorites(user.uid);

      const local = localStorage.getItem("local_favorites");

      let merged = serverFavorites;

      if (local) {
        const localFavorites = JSON.parse(local);

        merged = Array.from(new Set([...serverFavorites, ...localFavorites]));

        // Remove guest cache
        localStorage.removeItem("local_favorites");
        dispatch(markMerged());
      }

      dispatch(setFavorites(merged));
      await saveProfileFavorites(user.uid, merged);
    };

    mergeFavorites();
  }, [user, dispatch]);

  // ------------------------------
  // TOGGLE FAVORITE
  // ------------------------------
  const toggleFavorite = async (id) => {
    let newFavorites;

    if (favorites.includes(id)) {
      // remove
      newFavorites = favorites.filter((fav) => fav !== id);
      dispatch(removeFavorite(id));
    } else {
      // add
      newFavorites = [...favorites, id];
      dispatch(addFavorite(id));
    }

    if (user) {
      await saveProfileFavorites(user.uid, newFavorites);
    } else {
      localStorage.setItem("local_favorites", JSON.stringify(newFavorites));
    }
  };

  return { favorites, toggleFavorite };
}
