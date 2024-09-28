import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store"; // Use custom hooks
import { fetchStocks, selectCoin } from "../redux/stocksSlice";
import Header from "../components/Header";
import Details from "../components/Details";
import Overview from "../components/Overview";
import Chart from "../components/Chart";

/**
 * HomePage component displaying the main dashboard with various sections
 * @returns {JSX.Element} The main dashboard layout with a header, chart, overview, and details sections
 */
const HomePage: React.FC = () => {
  const dispatch = useAppDispatch(); // Use typed dispatch hook
  const selectedCoin = useAppSelector((state) => state.stocks.selectedCoin); // Use typed selector hook

  useEffect(() => {
    const fetchInitialData = async () => {
      if (!selectedCoin) {
        const action = await dispatch(fetchStocks("bitcoin")); // Fetch Bitcoin data
        if (fetchStocks.fulfilled.match(action)) {
          const bitcoinCoin = action.payload[0]; // Assuming the first result is Bitcoin
          if (bitcoinCoin) {
            dispatch(selectCoin(bitcoinCoin)); // Set Bitcoin as the selected coin
          }
        }
      }
    };

    fetchInitialData(); // Call the fetch function
  }, [dispatch, selectedCoin]);

  return (
    <div className="grid h-screen auto-rows-fr grid-cols-1 grid-rows-8 gap-6 bg-neutral-100 p-10 md:grid-cols-2 md:grid-rows-7 xl:grid-cols-3 xl:grid-rows-5">
      {/* Header section with the company name */}
      <div className="col-span-1 row-span-1 flex items-center justify-start md:col-span-2 xl:col-span-3">
        <Header selectedCoin={selectedCoin} />
      </div>

      {/* Chart section displaying historical stock data */}
      <div className="row-span-4 md:col-span-2">
        <Chart />
      </div>

      {/* Overview section with current stock details */}
      <div>
        <Overview selectedCoin={selectedCoin} />
      </div>

      {/* Details section with additional company information */}
      <div className="row-span-2 xl:row-span-3">
        <Details selectedCoin={selectedCoin} />
      </div>
    </div>
  );
};

export default HomePage;
