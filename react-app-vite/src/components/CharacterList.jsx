import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems, setQuery, resetItems, incrementPage } from "../features/items/itemsSlice";
import CharacterCard from "../components/CharacterCard";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";
import { useSearchParams } from "react-router-dom";
import "../components/CharacterList.css";

function CharacterList() {
    const dispatch = useDispatch();
    const { list, loadingList, errorList, query, page, hasMore } = useSelector((state) => state.items);

    const [searchParams, setSearchParams] = useSearchParams();
    const urlQuery = searchParams.get("q") || "";

    useEffect(() => {
        dispatch(setQuery(urlQuery));
        dispatch(resetItems());
        dispatch(fetchItems({ page: 1, query: urlQuery }));
    }, [urlQuery, dispatch]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchParams(value ? { q: value } : {});
    };

    const handleClear = () => {
        setSearchParams({});
    };

    const loadMore = () => {
        if (hasMore && !loadingList) {
            const nextPage = page + 1;
            dispatch(incrementPage());
            dispatch(fetchItems({ page: nextPage, query }));
        }
    };


    return (
        <div className="character-list">
            <h1>Rick and Morty Characters</h1>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search characters..."
                    value={query}
                    onChange={handleSearch}
                />
                <button className="clear-button" onClick={handleClear}>Clear</button>
            </div>

            {loadingList && <Spinner />}
            {errorList && <ErrorBox message={errorList} />}

            <ul>
                {list.map((char) => (
                    <CharacterCard key={char.id} character={char} />
                ))}
            </ul>

            {hasMore && !loadingList && (
                <button className="load-button" onClick={loadMore}>
                    Load More
                </button>
            )}

            {!hasMore && <p>No more characters</p>}
        </div>
    );
}

export default CharacterList;
