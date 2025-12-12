import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems, resetItems } from "../features/items/itemsSlice";
import CharacterCard from "../components/CharacterCard";
import { useFavorites } from "../hooks/useFavorites";
import Spinner from "../components/Spinner";

export default function Favorites() {
  const dispatch = useDispatch();
  const { favorites, loading: loadingFavorites } = useFavorites();
  const { list, loadingList } = useSelector(state => state.items);

  useEffect(() => {
    dispatch(resetItems());
    dispatch(fetchItems({ page: 1, query: "" }));
  }, [dispatch]);

  const isLoading = loadingList || loadingFavorites;

  const favoriteCharacters = list.filter(c => favorites.includes(c.id));

  return (
    <div className="character-list">
      <h1>Favorites</h1>

      {isLoading && <Spinner />}

      {!isLoading && (
        <>
          {favoriteCharacters.length === 0 ? (
            <p>No favorites yet.</p>
          ) : (
            <ul>
              {favoriteCharacters.map(char => (
                <CharacterCard key={char.id} character={char} />
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
