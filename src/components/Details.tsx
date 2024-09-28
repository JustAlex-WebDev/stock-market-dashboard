import React from "react";
import Card from "./Card";
import { Coin } from "../types";

/**
 * Details component that displays coin details.
 * @param {Coin} selectedCoin - The selected coin to display details for
 * @returns {JSX.Element} The details section showing information about the selected coin.
 */
const Details: React.FC<{ selectedCoin: Coin | null }> = ({ selectedCoin }) => {
  if (!selectedCoin) {
    return (
      <div>
        No coin details available. Please select a coin to view its details.
      </div>
    );
  }

  /**
   * Converts a number in millions to billions and formats it as a currency string.
   * @param {number} number - The number to convert and format.
   * @returns {string} The formatted string with the number in billions.
   */
  const convertMillionToBillion = (number: number): string =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number / 1000) + "B";

  const detailsList: Record<keyof Coin, string> = {
    id: "ID",
    symbol: "Symbol",
    name: "Name",
    image: "Image",
    current_price: "Current Price",
    market_cap: "Market Cap",
    market_cap_rank: "Market Cap Rank",
    fully_diluted_valuation: "Fully Diluted Valuation",
    total_volume: "Total Volume",
    high_24h: "High 24h",
    low_24h: "Low 24h",
    price_change_24h: "Price Change 24h",
    price_change_percentage_24h: "Price Change Percentage 24h",
    market_cap_change_24h: "Market Cap Change 24h",
    market_cap_change_percentage_24h: "Market Cap Change Percentage 24h",
    circulating_supply: "Circulating Supply",
    total_supply: "Total Supply",
    max_supply: "Max Supply",
    ath: "All-Time High",
    ath_change_percentage: "All-Time High Change Percentage",
    ath_date: "All-Time High Date",
    atl: "All-Time Low",
    atl_change_percentage: "All-Time Low Change Percentage",
    atl_date: "All-Time Low Date",
    roi: "ROI",
    last_updated: "Last Updated",
  };

  return (
    <Card>
      <ul className="flex h-full w-full flex-col justify-between divide-y-2">
        {Object.entries(detailsList).map(([key, label]) => {
          const value = selectedCoin[key as keyof Coin];

          const formattedValue =
            key === "market_cap" || key === "fully_diluted_valuation"
              ? convertMillionToBillion(value as number)
              : value && typeof value === "object"
                ? JSON.stringify(value)
                : value;

          return (
            <li key={key} className="flex flex-1 items-center justify-between">
              <span>{label}</span>
              <span>{formattedValue}</span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default Details;
