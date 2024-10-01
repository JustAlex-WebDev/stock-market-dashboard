import React, { useState, useRef, useEffect, useCallback } from "react";
import { RiSearchLine, RiCloseLine } from "../icons/icons";
import { useDispatch, useSelector } from "react-redux";
import SearchResults from "./SearchResults";
import { Coin } from "../types";
import { fetchStocks, selectCoin } from "../redux/stocksSlice";
import { RootState, AppDispatch } from "../redux/store";
import { debounce } from "lodash";

/**
 * Search component to search and display stock results.
 * Provides real-time search functionality with a debounced API call to fetch stock data.
 */
const Search: React.FC = () => {
  const DEBOUNCE_DELAY = 300;

  const [input, setInput] = useState<string>("");
  const [resultsVisible, setResultsVisible] = useState<boolean>(false);
  const [searchClicked, setSearchClicked] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1); // Track active index

  const dispatch = useDispatch<AppDispatch>();
  const {
    stocks: bestMatches,
    status,
    error,
  } = useSelector((state: RootState) => state.stocks);

  const searchRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Debounced function to fetch stocks based on user input
  const debouncedFetchStocks = useRef(
    debounce((searchTerm: string) => {
      if (searchTerm.trim().length > 0) {
        dispatch(fetchStocks(searchTerm));
      }
    }, DEBOUNCE_DELAY),
  ).current;

  /**
   * Clears the search input and resets related states.
   */
  const clear = () => {
    setInput("");
    setResultsVisible(false);
    setSearchClicked(false);
    setActiveIndex(-1); // Reset active index
  };

  /**
   * Updates the visibility of search results and fetches stock data.
   * @param {string} searchTerm - The current input value from the search box.
   */
  const updateBestMatches = (searchTerm: string) => {
    setResultsVisible(searchTerm.trim().length > 0);
    debouncedFetchStocks(searchTerm);
  };

  /**
   * Handles the selection of a coin from the search results.
   * @param {Coin} coin - The selected coin.
   */
  const handleSelect = useCallback(
    (coin: Coin) => {
      dispatch(selectCoin(coin));
      clear();
    },
    [dispatch],
  );

  /**
   * Closes the search results when clicking outside of the search component.
   * @param {MouseEvent} event - The mouse event object.
   */
  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setSearchClicked(false);
      setResultsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /**
   * Handles the button click event to focus on the search input.
   */
  const handleButtonClick = () => {
    setSearchClicked(true);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  /**
   * Handles keyboard navigation within the search results.
   * @param {React.KeyboardEvent<HTMLInputElement>} event - The keyboard event object.
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      setActiveIndex((prevIndex) =>
        prevIndex < bestMatches.length - 1 ? prevIndex + 1 : prevIndex,
      );
    } else if (event.key === "ArrowUp") {
      setActiveIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex,
      );
    } else if (event.key === "Enter") {
      if (activeIndex >= 0) {
        handleSelect(bestMatches[activeIndex]);
      }
    } else if (event.key === "Escape") {
      clear();
    }
  };

  return (
    <div
      className="group relative z-50 flex w-[400px] items-center justify-start rounded-lg bg-[#f5f7f9]"
      ref={searchRef}
    >
      <button
        type="button"
        onClick={handleButtonClick}
        aria-label="Search"
        title="Search"
        className="flex items-center justify-center rounded-md p-2"
      >
        <RiSearchLine
          size={16}
          className={`transition-all group-hover:fill-[#1b1b1b] ${
            searchClicked ? "fill-[#1b1b1b]" : "fill-gray-400"
          }`}
        />
      </button>

      <div className="w-full">
        <input
          ref={searchInputRef}
          type="text"
          value={input}
          aria-label="Search stocks"
          title="Search stocks"
          className="w-full bg-transparent pr-16 text-sm text-[#1b1b1b] focus:outline-none"
          onClick={() => {
            setSearchClicked(true);
          }}
          onChange={(e) => {
            setInput(e.target.value);
            updateBestMatches(e.target.value);
            setActiveIndex(-1); // Reset active index on input change
          }}
          onKeyDown={handleKeyDown} // Add keydown event handler
        />

        {!input && (
          <span className="pointer-events-none absolute left-8 top-[6.5px] text-sm text-gray-400">
            Press "<span className="text-xs font-bold">⌘</span>" to search for
            various stocks
          </span>
        )}
      </div>

      {input && (
        <button
          onClick={clear}
          aria-label="Clear search"
          title="Clear search"
          className={`m-1 transition-all ${input ? "opacity-100" : "opacity-0"}`}
        >
          <RiCloseLine className="h-4 w-4 fill-[#1b1b1b]" />
        </button>
      )}

      {error && (
        <div className="p-2 text-red-500" role="alert" aria-live="assertive">
          <p>Error fetching results. Please try again.</p>
        </div>
      )}

      <SearchResults
        results={bestMatches}
        resultsVisible={resultsVisible}
        loading={status === "loading"}
        onSelect={handleSelect}
        activeIndex={activeIndex} // Pass active index
        setActiveIndex={setActiveIndex} // Pass setActiveIndex function
      />
    </div>
  );
};

export default Search;
