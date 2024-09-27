import React from "react";
import StockList from "../components/StockList";
import Header from "../components/Header";
import { mockCompanyDetails } from "../constants/mock";
import Details from "../components/Details";
import Overview from "../components/Overview";
import Chart from "../components/Chart";

/**
 * HomePage component displaying the main dashboard with various sections
 * @returns {JSX.Element} The main dashboard layout with a header, chart, overview, and details sections
 */
const HomePage: React.FC = () => (
  <div className="grid h-screen auto-rows-fr grid-cols-1 grid-rows-8 gap-6 bg-neutral-100 p-10 md:grid-cols-2 md:grid-rows-7 xl:grid-cols-3 xl:grid-rows-5">
    {/* Header section with the company name */}
    <div className="col-span-1 row-span-1 flex items-center justify-start md:col-span-2 xl:col-span-3">
      <Header name={mockCompanyDetails.name} />
    </div>

    {/* Chart section displaying historical stock data */}
    <div className="row-span-4 md:col-span-2">
      <Chart />
    </div>

    {/* Overview section with current stock details */}
    <div>
      <Overview
        symbol={mockCompanyDetails.ticker}
        price={300} // Example price
        change={30} // Example change in price
        changePercent={10.0} // Example percentage change
        currency={"USD"} // Currency used for displaying the price
      />
    </div>

    {/* Details section with additional company information */}
    <div className="row-span-2 xl:row-span-3">
      <Details details={mockCompanyDetails} />
    </div>
  </div>
);

export default HomePage;
