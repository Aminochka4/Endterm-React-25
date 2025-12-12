import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems, setQuery, resetItems, incrementPage } from "../features/items/itemsSlice";
import CharacterCard from "../components/CharacterCard";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import "../components/CharacterList.css";

function CharacterList() {
    const dispatch = useDispatch();
    const { list, loadingList, errorList, query, page, hasMore } = useSelector((state) => state.items);

    const [searchParams, setSearchParams] = useSearchParams();
    const urlQuery = searchParams.get("q") || "";

    const [inputValue, setInputValue] = useState(urlQuery);
    const debouncedQuery = useDebounce(inputValue, 500);

    useEffect(() => {
        setSearchParams(debouncedQuery ? { q: debouncedQuery } : {});
        dispatch(setQuery(debouncedQuery));
        dispatch(resetItems());
        dispatch(fetchItems({ page: 1, query: debouncedQuery }));
    }, [debouncedQuery, dispatch, setSearchParams]);

    const handleSearch = (e) => {
        setInputValue(e.target.value); 
    };

    const handleClear = () => {
        setInputValue("");
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
                    value={inputValue}
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
