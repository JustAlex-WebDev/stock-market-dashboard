import React from "react";
import { Coin } from "../types";
import Search from "./Search";

/**
 * Header component that renders the company name and a search bar.
 * @param {Coin} selectedCoin - The selected coin to display in the header
 * @returns {JSX.Element} The header element containing the company name and search functionality.
 */
const Header: React.FC<{ selectedCoin: Coin | null }> = ({ selectedCoin }) => {
  return (
    <header className="xl:px-32" role="banner">
      <h1 className="text-5xl font-bold" aria-live="polite">
        {selectedCoin?.name || "Select a cryptocurrency"}
      </h1>
      <Search />
    </header>
  );
};

export default Header;
