import { createSlice } from "@reduxjs/toolkit";
import { getProfile, saveProfileFavorites } from "../../services/profileService";

const initialState = {
  favorites: [], 
  merged: false, 
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites(state, action) {
      state.favorites = action.payload;
    },
    addFavorite(state, action) {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite(state, action) {
      state.favorites = state.favorites.filter((id) => id !== action.payload);
    },
    markMerged(state) {
      state.merged = true;
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite, markMerged } = favoritesSlice.actions;
export default favoritesSlice.reducer;
