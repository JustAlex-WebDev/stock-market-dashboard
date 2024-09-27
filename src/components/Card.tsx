import React, { ReactNode } from "react";

/**
 * Props for the Card component.
 * @property {ReactNode} children - The content to be displayed inside the card.
 */
interface CardProps {
  children: ReactNode;
}

/**
 * Card component that wraps its children with a styled border and background.
 * @param {CardProps} props - The props for the component.
 * @param {ReactNode} props.children - The content to be rendered inside the card.
 * @returns {JSX.Element} A div element styled as a card with a border and background.
 */
const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="relative h-full w-full rounded-md border-2 border-neutral-200 bg-white p-8">
      {children}
    </div>
  );
};

export default Card;
