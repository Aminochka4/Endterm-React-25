import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemById } from "../features/items/itemsSlice";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";
import "./CharacterDetails.css";

function CharacterDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { selectedItem, loadingItem, errorItem } = useSelector((state) => state.items);

    useEffect(() => {
        dispatch(fetchItemById(id));
    }, [id, dispatch]);

    if (loadingItem) return <Spinner />;
    if (errorItem) return <ErrorBox message={errorItem} />;
    if (!selectedItem) return <ErrorBox message="Character not found" />;

    const character = selectedItem;

    return (
        <div className="character-details-container">
            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

            <div className="character-card-details">
                <img src={character.image} alt={character.name} />
                <div className="character-info">
                    <h2>{character.name}</h2>
                    <p><strong>Status:</strong> {character.status}</p>
                    <p><strong>Species:</strong> {character.species}</p>
                    <p><strong>Gender:</strong> {character.gender}</p>
                    <p><strong>Origin:</strong> {character.origin.name}</p>
                    <p><strong>Location:</strong> {character.location.name}</p>
                    <p><strong>Episodes:</strong> {character.episode.length}</p>
                </div>
            </div>
        </div>
    );
}

export default CharacterDetails;
