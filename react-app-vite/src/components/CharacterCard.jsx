import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite, updateFavoritesInServer } from "../features/favorites/favoritesSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import "./CharacterCard.css";

function CharacterCard({ character }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const { currentUser } = useAuth();

  const isFav = favorites.includes(character.id);

  const toggleFavorite = () => {
    let updatedFavorites;

    if (isFav) {
      dispatch(removeFavorite(character.id));
      updatedFavorites = favorites.filter((id) => id !== character.id);
    } else {
      dispatch(addFavorite(character.id));
      updatedFavorites = [...favorites, character.id];
    }

    // Если авторизован → обновляем на сервере
    if (currentUser) {
      dispatch(updateFavoritesInServer({ userId: currentUser.uid, favorites: updatedFavorites }));
    }
  };

  return (
    <div className="character-card">
      <div className="card-image-wrapper">
        <img src={character.image} alt={character.name} />
        <button className="favorite-btn" onClick={toggleFavorite}>
          {isFav ? <FaHeart className="heart filled" /> : <FaRegHeart className="heart" />}
        </button>
      </div>

      <h3>{character.name}</h3>
      <p className="text-card">Status: {character.status}</p>

      <Link className="show-more-button" to={`/characters/${character.id}`}>
        Details
      </Link>
    </div>
  );
}

export default CharacterCard;
