import React from "react";
import { Coin } from "../types";

interface SearchResultsProps {
  results: Coin[];
  loading: boolean;
  onSelect: (coin: Coin) => void;
}

/**
 * SearchResults component displays a list of search results for cryptocurrencies.
 * @param {SearchResultsProps} props - The properties passed to the component.
 * @returns {JSX.Element} A list of search results or a loading spinner.
 */
const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  loading,
  onSelect,
}) => {
  return (
    <ul
      className="absolute top-12 h-64 w-full overflow-x-hidden overflow-y-scroll rounded-md border-2 border-neutral-200 bg-white shadow-md"
      role="listbox"
    >
      {loading && (
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-4 border-t-4 border-gray-300"></div>
        </div>
      )}
      {!loading && results.length === 0 && (
        <li className="p-4 text-center">No results found</li>
      )}
      {!loading &&
        results.map((coin) => (
          <li
            key={coin.id}
            role="option"
            className="m-2 flex cursor-pointer items-center justify-between rounded-md p-4 hover:bg-indigo-200"
            onClick={() => onSelect(coin)}
            aria-label={`Select ${coin.name}`}
          >
            <span>{coin.symbol.toUpperCase()}</span>
            <span>{coin.name}</span>
          </li>
        ))}
    </ul>
  );
};

export default SearchResults;
