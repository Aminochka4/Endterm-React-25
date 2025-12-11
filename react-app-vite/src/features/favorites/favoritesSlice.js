import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Получение favorites с сервера
export const fetchFavoritesFromServer = createAsyncThunk(
  "favorites/fetchFromServer",
  async (userId) => {
    const ref = doc(db, "favorites", userId);
    const snap = await getDoc(ref);
    if (snap.exists()) return snap.data().items;
    return [];
  }
);

// Слияние локальных + серверных при логине
export const syncFavoritesOnLogin = createAsyncThunk(
  "favorites/syncOnLogin",
  async ({ userId, localFavorites }) => {
    const ref = doc(db, "favorites", userId);
    const snap = await getDoc(ref);
    const serverFavorites = snap.exists() ? snap.data().items : [];

    const merged = Array.from(new Set([...serverFavorites, ...localFavorites]));

    await setDoc(ref, { items: merged });

    // Очищаем localStorage после слияния
    localStorage.removeItem("favorites");

    return merged;
  }
);

// Обновление favorites на сервере
export const updateFavoritesInServer = createAsyncThunk(
  "favorites/updateInServer",
  async ({ userId, favorites }) => {
    const ref = doc(db, "favorites", userId);
    await setDoc(ref, { items: favorites });
    return favorites;
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
  },
  reducers: {
    addFavorite(state, action) {
      state.items.push(action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
    removeFavorite(state, action) {
      state.items = state.items.filter((id) => id !== action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
    clearFavorites(state) {
      state.items = [];
      localStorage.removeItem("favorites");
    },
    setFavorites(state, action) {
      state.items = action.payload;
      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncFavoritesOnLogin.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(updateFavoritesInServer.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchFavoritesFromServer.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const { addFavorite, removeFavorite, clearFavorites, setFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
