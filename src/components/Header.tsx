import React, { useState, useEffect } from "react";
import { motion as m } from "framer-motion";
import Search from "./Search";
import { RiAccountCircleLine } from "../icons/icons";

/**
 * Header component that renders the company name and a search bar.
 * @returns {JSX.Element} The header element containing the company name and search functionality.
 */
const Header: React.FC = () => {
  const [loading, setLoading] = useState(true); // Loading state for skeleton animation

  // Simulate loading for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Skeleton shimmer animation
  const shimmerVariants = {
    loading: {
      backgroundPosition: "200% 0",
    },
    loaded: {
      opacity: 1,
    },
  };

  return (
    <header
      className="flex w-full items-center justify-between gap-2 border-b-2 border-gray-100 bg-white p-8 sm:gap-4"
      role="banner"
    >
      <img
        src="images/smd-logo.svg"
        alt="Stock Market Dashboard company logo"
        className="block h-auto w-12 cursor-pointer transition-all hover:opacity-50 md:hidden"
      />

      {/* Updated Search component with skeleton animation */}
      <Search />

      {/* User account icon and name */}
      <div className="hidden w-auto items-center justify-center gap-2 sm:flex">
        {loading ? (
          <>
            <m.div
              className="h-5 w-5 animate-pulse rounded-full bg-gray-200" // Skeleton for the icon
              variants={shimmerVariants}
              animate={loading ? "loading" : "loaded"}
              transition={{ duration: 0.5 }}
            />
            <m.div
              className="h-5 w-24 animate-pulse rounded bg-gray-200" // Skeleton for the name
              variants={shimmerVariants}
              animate={loading ? "loading" : "loaded"}
              transition={{ duration: 0.5 }}
            />
          </>
        ) : (
          <div
            className="flex cursor-pointer gap-2 whitespace-nowrap transition-all hover:opacity-50"
            title="Account"
            aria-label="Account"
          >
            <m.div
              initial={{ opacity: 0 }} // Initial state for the icon
              animate={{ opacity: 1 }} // Final state for the icon
              transition={{ duration: 0.5, delay: 0.5 }} // Smooth appearance for the icon
            >
              <RiAccountCircleLine size={20} />
            </m.div>
            <m.span
              className="text-sm font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }} // Smooth appearance for the name
            >
              Hugh Jass
            </m.span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
