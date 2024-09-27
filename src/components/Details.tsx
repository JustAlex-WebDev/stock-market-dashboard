import React from "react";
import Card from "./Card";

/**
 * Represents the details of a company.
 * @property {string} name - The name of the company.
 * @property {string} country - The country where the company is based.
 * @property {string} currency - The currency used by the company.
 * @property {string} exchange - The stock exchange where the company is listed.
 * @property {string} ipo - The IPO date of the company.
 * @property {number} marketCapitalization - The market capitalization of the company in millions.
 * @property {string} finnhubIndustry - The industry category of the company.
 */
interface CompanyDetails {
  name: string;
  country: string;
  currency: string;
  exchange: string;
  ipo: string;
  marketCapitalization: number;
  finnhubIndustry: string;
}

/**
 * Props for the Details component.
 * @property {CompanyDetails} details - The company details to be displayed.
 */
interface DetailsProps {
  details: CompanyDetails;
}

/**
 * Converts a number in millions to billions and formats it as a currency string.
 * @param {number} number - The number to convert and format.
 * @returns {string} The formatted string with the number in billions.
 */
const convertMillionToBillion = (number: number): string => {
  return (
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number / 1000) + "B"
  );
};

/**
 * Details component that shows information about a company, such as its name, country, currency, exchange, IPO date, market capitalization, and industry.
 * @param {DetailsProps} props - The props for the component.
 * @param {CompanyDetails} props.details - The company details to display.
 * @returns {JSX.Element} The card element containing the company details.
 */
const Details: React.FC<DetailsProps> = ({ details }) => {
  // Map of detail keys to their corresponding labels
  const detailsList: Record<keyof CompanyDetails, string> = {
    name: "Name",
    country: "Country",
    currency: "Currency",
    exchange: "Exchange",
    ipo: "IPO Date",
    marketCapitalization: "Market Capitalization",
    finnhubIndustry: "Industry",
  };

  return (
    <Card>
      {/* List of company details */}
      <ul className="flex h-full w-full flex-col justify-between divide-y-2">
        {Object.keys(detailsList).map((item) => {
          // Cast item to keyof CompanyDetails to ensure type safety
          const key = item as keyof CompanyDetails;
          return (
            <li key={item} className="flex flex-1 items-center justify-between">
              {/* Label for the detail */}
              <span>{detailsList[key]}</span>
              {/* Value for the detail, converted if it's market capitalization */}
              <span>
                {key === "marketCapitalization"
                  ? convertMillionToBillion(details[key] as number)
                  : details[key]}
              </span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default Details;
