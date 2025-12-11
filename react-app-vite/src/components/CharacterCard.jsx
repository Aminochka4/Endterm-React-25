import React from "react";
import "./CharacterCard.css";
import { Link } from "react-router-dom";

function CharacterCard({ character }) {
    return (
        <li className="character-card">
            <img src={character.image} alt={character.name} />
            <h3 className="text-card">{character.name}</h3>
            <p className="text-card">Status: {character.status}</p>
            <p className="text-card">Species: {character.species}</p>
            <Link to={`/characters/${character.id}`} className="show-more-button"> Show More </Link>

        </li>
    );
}

export default CharacterCard;
