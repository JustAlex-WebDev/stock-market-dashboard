import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import StockPage from "../pages/StockPage";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/stock/:symbol" element={<StockPage />} />
  </Routes>
);

export default AppRoutes;
