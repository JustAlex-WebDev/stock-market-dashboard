import React from "react";
import Card from "./Card";

/**
 * Props for the Overview component.
 * @property {string} symbol - The stock symbol to display.
 * @property {number} price - The current price of the stock.
 * @property {number} change - The change in stock price from the previous day.
 * @property {number} changePercent - The percentage change in stock price.
 * @property {string} currency - The currency of the stock price.
 */
interface OverviewProps {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  currency: string;
}

/**
 * Overview component that shows detailed information about a stock, including its symbol, price, change, and percentage change.
 * @param {OverviewProps} props - The props for the component.
 * @param {string} props.symbol - The stock symbol.
 * @param {number} props.price - The current stock price.
 * @param {number} props.change - The absolute change in the stock price.
 * @param {number} props.changePercent - The percentage change in the stock price.
 * @param {string} props.currency - The currency in which the stock price is quoted.
 * @returns {JSX.Element} The card element containing the stock overview information.
 */
const Overview: React.FC<OverviewProps> = ({
  symbol,
  price,
  change,
  changePercent,
  currency,
}) => {
  // Determine if the price change is positive or negative
  const isPositiveChange = change > 0;

  return (
    <Card>
      {/* Display the stock symbol */}
      <span className="absolute left-4 top-4 text-lg text-neutral-400 xl:text-xl 2xl:text-2xl">
        {symbol}
      </span>

      {/* Display the stock price and currency, and the price change */}
      <div className="flex h-full w-full items-center justify-around">
        <span className="flex items-center text-2xl xl:text-4xl 2xl:text-5xl">
          ${price.toFixed(2)}{" "}
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
          {change.toFixed(2)} <span>({changePercent.toFixed(2)}%)</span>
        </span>
      </div>
    </Card>
  );
};

export default Overview;
