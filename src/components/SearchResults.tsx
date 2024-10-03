import React from "react";
import { Coin } from "../types";

interface SearchResultsProps {
  results: Coin[];
  resultsVisible: boolean;
  loading: boolean;
  onSelect: (coin: Coin) => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  error: string | null; // Receive the error message as a prop
}

/**
 * SearchResults component displays a list of coin search results.
 * It handles the display of loading states, error messages,
 * and allows users to select a coin from the list.
 *
 * @param {SearchResultsProps} props The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  resultsVisible,
  loading,
  onSelect,
  activeIndex,
  setActiveIndex,
  error,
}) => {
  return (
    <ul
      title="Search Results"
      className={`absolute top-12 ${resultsVisible ? "h-64" : "h-0"} w-full overflow-x-hidden overflow-y-scroll rounded-lg bg-[#f5f7f9] shadow-md transition-all`}
      role="listbox"
    >
      {/* Loading spinner */}
      {loading && (
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-4 border-t-4 border-gray-300"></div>
        </div>
      )}

      {/* Error message */}
      {!loading && results.length === 0 && (
        <li className="flex h-full w-full items-center justify-center font-semibold">
          {error}
        </li>
      )}

      {/* Search Results */}
      {!loading &&
        results.map((coin, index) => {
          const isPositiveChange = coin.price_change_24h > 0;

          /**
           * Handle keyboard navigation and selection.
           * Allows users to navigate search results with arrow keys and select with Enter.
           * @param {React.KeyboardEvent<HTMLLIElement>} event The keyboard event triggered by key presses.
           */
          const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
            if (event.key === "Enter") {
              onSelect(coin);
            }
          };

          return (
            <li
              key={coin.id}
              role="option"
              className={`m-2 flex cursor-pointer items-center justify-between rounded-md p-4 text-black transition-all hover:bg-[#dde0e2] ${
                index === activeIndex ? "bg-[#dde0e2]" : "bg-[#f5f7f9]"
              }`}
              onClick={() => onSelect(coin)}
              onMouseEnter={() => setActiveIndex(index)}
              onKeyDown={handleKeyDown}
              aria-label={`Select ${coin.name}`}
              tabIndex={0}
            >
              <span>{coin.symbol.toUpperCase()}</span>
              <span>{coin.name}</span>
            </li>
          );
        })}
    </ul>
  );
};

export default SearchResults;
