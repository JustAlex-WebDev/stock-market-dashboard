import React from "react";

// Define the type for the props expected in SearchResults
interface SearchResultsProps {
  results: {
    symbol: string;
    description: string;
  }[];
}

/**
 * SearchResults component that renders a list of matching stocks.
 * Displays a scrollable list of stock symbols and their descriptions.
 * @param {SearchResultsProps} props - The props containing the search results.
 * @returns {JSX.Element} A list of search results with clickable items.
 */
const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <ul className="cursor-scrollbar absolute top-12 h-64 w-full overflow-y-scroll rounded-md border-2 border-neutral-200 bg-white shadow-md">
      {/* Iterate over the search results and render each item */}
      {results.map((item) => (
        <li
          key={item.symbol} // Use stock symbol as the unique key for list items
          className="m-2 flex cursor-pointer items-center justify-between rounded-md p-4 hover:bg-indigo-200"
        >
          <span>{item.symbol}</span> {/* Display the stock symbol */}
          <span>{item.description}</span> {/* Display the stock description */}
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
