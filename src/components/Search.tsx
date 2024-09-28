import React, { useState, useRef, useEffect, useCallback } from "react";
import { IoSearch, IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import SearchResults from "./SearchResults";
import { Coin } from "../types";
import { fetchStocks, selectCoin } from "../redux/stocksSlice";
import { RootState, AppDispatch } from "../redux/store";
import { debounce } from "lodash";

const DEBOUNCE_DELAY = 300;

const Search: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [resultsVisible, setResultsVisible] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const {
    stocks: bestMatches,
    status,
    error,
  } = useSelector((state: RootState) => state.stocks);
  const searchRef = useRef<HTMLDivElement | null>(null);

  const debouncedFetchStocks = useRef(
    debounce((searchTerm: string) => {
      if (searchTerm.trim().length > 0) {
        dispatch(fetchStocks(searchTerm));
      }
    }, DEBOUNCE_DELAY),
  ).current;

  const clear = () => {
    setInput("");
    setResultsVisible(false);
  };

  const updateBestMatches = (searchTerm: string) => {
    setResultsVisible(searchTerm.trim().length > 0);
    debouncedFetchStocks(searchTerm);
  };

  const handleSelect = useCallback(
    (coin: Coin) => {
      dispatch(selectCoin(coin));
      clear();
    },
    [dispatch],
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      clear();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="relative z-50 my-4 flex w-96 items-center rounded-md border-2 border-neutral-200 bg-white"
      ref={searchRef}
    >
      <input
        type="text"
        value={input}
        aria-label="Search stocks"
        className="w-full rounded-md px-4 py-2 focus:outline-none"
        placeholder="Search stock..."
        onChange={(e) => {
          setInput(e.target.value);
          updateBestMatches(e.target.value);
        }}
      />
      {input && (
        <button onClick={clear} aria-label="Clear search" className="m-1">
          <IoClose className="h-4 w-4 fill-gray-500" />
        </button>
      )}
      <button
        onClick={() => updateBestMatches(input)}
        aria-label="Search"
        className="m-1 flex h-8 w-8 items-center justify-center rounded-md bg-indigo-600 p-2"
      >
        <IoSearch className="h-4 w-4 fill-gray-100" />
      </button>
      {error && (
        <div className="p-2 text-red-500" role="alert" aria-live="assertive">
          <p>Error fetching results. Please try again.</p>
        </div>
      )}
      {resultsVisible && (
        <SearchResults
          results={bestMatches}
          loading={status === "loading"}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
};

export default Search;
