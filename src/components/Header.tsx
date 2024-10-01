import React from "react";
import Search from "./Search";

/**
 * Header component that renders the company name and a search bar.
 * @param {Coin} selectedCoin - The selected coin to display in the header
 * @returns {JSX.Element} The header element containing the company name and search functionality.
 */
const Header: React.FC = () => {
  return (
    <header
      className="flex w-full items-center justify-between bg-white p-8"
      role="banner"
    >
      {/* <span
        className="text-lg font-bold text-[#1b1b1b] xl:text-xl"
        aria-live="polite"
      >
        My Portfolio
      </span> */}

      <Search />
    </header>
  );
};

export default Header;
