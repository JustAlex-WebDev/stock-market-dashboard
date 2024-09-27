import React, { useState } from "react";
import { mockSearchResults } from "../constants/mock";
import { IoSearch, IoClose } from "react-icons/io5";
import SearchResults from "./SearchResults";

// Define type for search result item
interface SearchResult {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

/**
 * Search component for handling user input and displaying search results
 * Allows users to search for stock symbols and view matching results
 * @returns {JSX.Element} The search input and results display
 */
const Search: React.FC = () => {
  // State to manage the search input value
  const [input, setInput] = useState<string>("");

  // State to hold the search results
  const [bestMatches, setBestMatches] = useState<SearchResult[]>([]);

  /**
   * Clears the search input and results
   * Resets the input field and empty the search results
   */
  const clear = () => {
    setInput("");
    setBestMatches([]);
  };

  /**
   * Updates the search results based on the input value
   * Simulates fetching search results from an API
   * Sets mock search results if input is not empty
   */
  const updateBestMatches = () => {
    if (input.trim()) {
      setBestMatches(mockSearchResults.result); // Simulate API response
    }
  };

  return (
    <div className="relative z-50 my-4 flex w-96 items-center rounded-md border-2 border-neutral-200 bg-white">
      {/* Input field for user to type search query */}
      <input
        type="text"
        value={input}
        className="w-full rounded-md px-4 py-2 focus:outline-none"
        placeholder="Search stock..."
        onChange={(e) => setInput(e.target.value)} // Update input value on change
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateBestMatches(); // Trigger search on Enter key press
          }
        }}
      />

      {/* Button to clear the search input */}
      {input && (
        <button onClick={clear} className="m-1">
          <IoClose className="h-4 w-4 fill-gray-500" />
        </button>
      )}

      {/* Button to trigger search manually */}
      <button
        onClick={updateBestMatches}
        className="m-1 flex h-8 w-8 items-center justify-center rounded-md bg-indigo-600 p-2"
      >
        <IoSearch className="h-4 w-4 fill-gray-100" />
      </button>

      {/* Component to display search results if input is present and results are available */}
      {input && bestMatches.length > 0 && (
        <SearchResults results={bestMatches} />
      )}
    </div>
  );
};

export default Search;
