import React from "react";
import Card from "./Card";
import { Coin } from "../types";

/**
 * Overview component that shows detailed information about a coin, including its symbol, price, change, and percentage change.
 * @param {Coin | null} selectedCoin - The selected coin object containing stock details.
 * @returns {JSX.Element} The card element containing the coin overview information.
 */
const Overview: React.FC<{ selectedCoin: Coin | null }> = React.memo(
  ({ selectedCoin }) => {
    // Check if selectedCoin is available
    if (!selectedCoin) {
      return (
        <div>
          No coin overview available. Please select a coin to view details.
        </div>
      );
    }

    const currency = "USD";
    const {
      symbol,
      current_price,
      price_change_24h,
      price_change_percentage_24h,
    } = selectedCoin;

    // Determine if the price change is positive or negative
    const isPositiveChange = price_change_24h > 0;

    return (
      <Card>
        {/* Display the coin symbol */}
        <span className="absolute left-4 top-4 text-lg text-neutral-400 xl:text-xl 2xl:text-2xl">
          {symbol}
        </span>

        {/* Display the coin price and currency, and the price change */}
        <div className="flex h-full w-full items-center justify-around">
          <span className="flex items-center text-2xl xl:text-4xl 2xl:text-5xl">
            ${current_price.toFixed(2)}{" "}
            <span className="m-2 text-lg text-neutral-400 xl:text-xl 2xl:text-2xl">
              {currency}
            </span>
          </span>

          {/* Display the price change with appropriate color based on its value */}
          <span
            className={`text-lg xl:text-xl 2xl:text-2xl ${
              isPositiveChange ? "text-lime-500" : "text-red-500"
            }`}
          >
            {isPositiveChange ? "+" : ""}
            {price_change_24h.toFixed(2)}{" "}
            <span>({price_change_percentage_24h.toFixed(2)}%)</span>
          </span>
        </div>
      </Card>
    );
  },
);

export default Overview;
