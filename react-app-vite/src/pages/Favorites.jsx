import React from "react";
import { useSelector } from "react-redux";
import CharacterCard from "../components/CharacterCard";
import "./Favorites.css";

function Favorites() {
  const favorites = useSelector((state) => state.favorites.items);
  const allCharacters = useSelector((state) => state.items.list || []); // берём все персонажи из Redux

  // Фильтруем персонажей по favorites
  const favoriteCharacters = allCharacters.filter((char) => favorites.includes(char.id));

  return (
    <div className="favorites-page">
      <h2>My Favorites</h2>
      {favoriteCharacters.length === 0 ? (
        <h3>No favorites yet.</h3>
      ) : (
        <ul className="favorites-list">
          {favoriteCharacters.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favorites;
