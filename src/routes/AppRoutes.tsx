import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import StockPage from "../pages/StockPage";

/**
 * Component responsible for defining the application's routes.
 * Uses React Router to manage navigation between different pages of the app.
 * @returns {JSX.Element} A set of routes for the application.
 */
const AppRoutes: React.FC = () => (
  <Routes>
    {/* Route for the home page */}
    {/* This will render the HomePage component when the URL path is '/' */}
    <Route path="/" element={<HomePage />} />

    {/* Route for stock details page */}
    {/* This will render the StockPage component when the URL path matches '/stock/:symbol' */}
    {/* The ':symbol' is a URL parameter that will be used to display information about a specific stock */}
    <Route path="/stock/:symbol" element={<StockPage />} />
  </Routes>
);

export default AppRoutes;
