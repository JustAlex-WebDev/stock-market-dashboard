import React from "react";
import { Coin } from "../types";

interface SearchResultsProps {
  results: Coin[];
  resultsVisible: boolean;
  loading: boolean;
  onSelect: (coin: Coin) => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

/**
 * SearchResults component displays a list of search results for cryptocurrencies.
 * It also indicates the price change status with background color on hover.
 * @param {SearchResultsProps} props - The properties passed to the component.
 * @returns {JSX.Element} A list of search results or a loading spinner.
 */
const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  resultsVisible,
  loading,
  onSelect,
  activeIndex,
  setActiveIndex,
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
        <li className="p-4 text-center">No results found</li>
      )}

      {/* Search Results */}
      {!loading &&
        results.map((coin, index) => {
          // Determine if the price change is positive or negative
          const isPositiveChange = coin.price_change_24h > 0;

          const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
            if (event.key === "Enter") {
              onSelect(coin); // Trigger onSelect when Enter is pressed
            }
          };

          return (
            <li
              key={coin.id}
              role="option"
              className={`m-2 flex cursor-pointer items-center justify-between rounded-md p-4 text-black transition-all ${index === activeIndex ? "bg-gray-300" : "bg-[#f5f7f9]"} ${isPositiveChange ? "hover:bg-lime-500" : "hover:bg-red-500"}`}
              onClick={() => onSelect(coin)}
              onMouseEnter={() => setActiveIndex(index)} // Set active index on mouse enter
              onKeyDown={handleKeyDown} // Add keydown event handler
              aria-label={`Select ${coin.name}`}
              tabIndex={0} // Make the list item focusable
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
