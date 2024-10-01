import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

/**
 * Component responsible for defining the application's routes.
 * Uses React Router to manage navigation between different pages of the app.
 * @returns {JSX.Element} A set of routes for the application.
 */
const AppRoutes: React.FC = () => (
  <Routes>
    {/* Route for the home page */}
    {/* This will render the Dashboard component when the URL path is '/' */}
    <Route path="/" element={<Dashboard />} />
  </Routes>
);

export default AppRoutes;
