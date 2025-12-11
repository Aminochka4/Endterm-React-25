import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "../features/items/itemsSlice";
import favoritesReducer from "../features/items/favoritesSlice"; 

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    favorites: favoritesReducer,
  },
});
