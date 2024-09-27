import React from "react";
import Search from "./Search";

/**
 * Props for the Header component.
 * @property {string} name - The name of the company to display in the header.
 */
interface HeaderProps {
  name: string;
}

/**
 * Header component that renders the company name and a search bar.
 * @param {HeaderProps} props - The props for the component.
 * @param {string} props.name - The name of the company to be displayed.
 * @returns {JSX.Element} The header element containing the company name and search functionality.
 */
const Header: React.FC<HeaderProps> = ({ name }) => {
  return (
    <header className="xl:px-32">
      <h1 className="text-5xl font-bold">{name}</h1>
      <Search />
    </header>
  );
};

export default Header;
