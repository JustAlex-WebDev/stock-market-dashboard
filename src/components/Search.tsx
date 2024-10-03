import React, { useState, useRef, useEffect, useCallback } from "react";
import { RiSearchLine, RiCloseLine } from "../icons/icons";
import { useDispatch, useSelector } from "react-redux";
import SearchResults from "./SearchResults";
import { Coin } from "../types";
import { fetchStocks, selectCoin } from "../redux/stocksSlice";
import { RootState, AppDispatch } from "../redux/store";
import { debounce } from "lodash";

/**
 * Search component that provides an input for searching stocks and displays results.
 * @returns {JSX.Element} The search element containing the input field and results.
 */
const Search: React.FC = () => {
  const DEBOUNCE_DELAY = 300; // Debounce delay to avoid excessive API calls

  const [input, setInput] = useState<string>(""); // State for search input
  const [resultsVisible, setResultsVisible] = useState<boolean>(false); // Toggle search results visibility
  const [searchClicked, setSearchClicked] = useState<boolean>(false); // Track if the search was clicked
  const [activeIndex, setActiveIndex] = useState<number>(-1); // Active index for keyboard navigation

  const dispatch = useDispatch<AppDispatch>();
  const {
    stocks: bestMatches,
    status,
    error,
  } = useSelector((state: RootState) => state.stocks); // Get stocks, status, and error from Redux

  const searchRef = useRef<HTMLDivElement | null>(null); // Reference to search container
  const searchInputRef = useRef<HTMLInputElement | null>(null); // Reference to search input

  // Debounce fetchStocks to optimize search performance
  const debouncedFetchStocks = useRef(
    debounce((searchTerm: string) => {
      if (searchTerm.trim().length > 0) {
        dispatch(fetchStocks(searchTerm));
      }
    }, DEBOUNCE_DELAY),
  ).current;

  /**
   * Clear the search input and reset state.
   * Resets input, visibility of results, click state, and active index.
   */
  const clear = () => {
    setInput("");
    setResultsVisible(false);
    setSearchClicked(false);
    setActiveIndex(-1); // Reset active index
  };

  /**
   * Update search results and visibility based on the input.
   * @param {string} searchTerm The search term input by the user.
   */
  const updateBestMatches = (searchTerm: string) => {
    setResultsVisible(searchTerm.trim().length > 0);
    debouncedFetchStocks(searchTerm);
  };

  /**
   * Handle selection of a search result.
   * Dispatches the selected coin and clears the input.
   * @param {Coin} coin The selected coin object.
   */
  const handleSelect = useCallback(
    (coin: Coin) => {
      dispatch(selectCoin(coin)); // Dispatch action to select the coin
      clear(); // Clear the input after selection
    },
    [dispatch],
  );

  /**
   * Handle clicks outside the search box to close it.
   * @param {MouseEvent} event The mouse event triggered by a click.
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

  /**
   * Attach and detach click listener for outside clicks.
   * Sets up an event listener for mouse clicks and cleans it up on unmount.
   */
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /**
   * Handle search button click.
   * Sets the clicked state and focuses the search input.
   */
  const handleButtonClick = () => {
    setSearchClicked(true);
    if (searchInputRef.current) {
      searchInputRef.current.focus(); // Focus the input on click
    }
  };

  /**
   * Handle keyboard navigation and selection.
   * Allows users to navigate search results with arrow keys and select with Enter.
   * @param {React.KeyboardEvent<HTMLInputElement>} event The keyboard event triggered by key presses.
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
        handleSelect(bestMatches[activeIndex]); // Select the active coin on Enter
      }
    } else if (event.key === "Escape") {
      clear(); // Clear the input on Escape
    }
  };

  /**
   * Get error message based on the error state.
   * Handles specific error types for better user feedback.
   * @returns {string} The error message to be displayed.
   */
  const getErrorMessage = () => {
    if (error?.type === 429) {
      return "Too Many Requests"; // Handle specific error
    }
    return error?.message || "No results found"; // Return generic error message
  };

  return (
    <div
      className="group relative z-40 flex w-full items-center justify-start rounded-xl bg-[#f5f7f9] px-2 md:w-[400px]"
      ref={searchRef}
    >
      {/* Search Button */}
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

      {/* Search Input */}
      <div className="w-full">
        <input
          ref={searchInputRef}
          type="text"
          value={input}
          aria-label="Search stocks"
          title="Search stocks"
          className="w-full bg-transparent py-2 pr-16 text-sm text-[#1b1b1b] focus:outline-none"
          onClick={() => {
            setSearchClicked(true);
          }}
          onChange={(e) => {
            setInput(e.target.value);
            setResultsVisible(true);
            updateBestMatches(e.target.value);
            setActiveIndex(-1); // Reset active index on input change
          }}
          onKeyDown={handleKeyDown}
        />

        {/* Placeholder text */}
        {!input && (
          <span className="pointer-events-none absolute left-10 top-2 w-auto text-sm text-gray-400">
            <span className="hidden sm:inline">
              Press "<span className="text-xs font-bold">⌘</span>" to search for
              various stocks
            </span>
            <span className="sm:hidden">Search for stocks</span>
          </span>
        )}
      </div>

      {/* Clear Button */}
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

      {/* Search Results */}
      <SearchResults
        results={bestMatches}
        resultsVisible={resultsVisible}
        loading={status === "loading"}
        onSelect={handleSelect}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        error={getErrorMessage()} // Pass the error message down
      />
    </div>
  );
};

export default Search;
