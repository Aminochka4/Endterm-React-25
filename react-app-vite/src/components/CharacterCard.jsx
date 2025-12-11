import React from "react";
import "./CharacterCard.css";
import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { FaHeart, FaRegHeart, FaSkull, FaUserAlt } from "react-icons/fa";

function CharacterCard({ character }) {
    const { favorites, toggleFavorite } = useFavorites();
    const isFavorite = favorites.includes(character.id);

    return (
        <li className="character-card">
            <div className="card-image-wrapper">
                <img src={character.image} alt={character.name} className="card-image" />

                <button
                    className={`favorite-button ${isFavorite ? "favorited" : ""}`}
                    onClick={() => toggleFavorite(character.id)}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                    {isFavorite ? <FaHeart /> : <FaRegHeart />}
                </button>
            </div>

            <div className="card-info">
                <h3 className="text-card">{character.name}</h3>

                <p className="text-card">
                    <FaSkull style={{ marginRight: "5px" }} />
                    {character.status}
                </p>

                <p className="text-card">
                    <FaUserAlt style={{ marginRight: "5px" }} />
                    {character.species}
                </p>

                <Link to={`/characters/${character.id}`} className="show-more-button">
                    Show More
                </Link>
            </div>
        </li>
    );
}

export default CharacterCard;
