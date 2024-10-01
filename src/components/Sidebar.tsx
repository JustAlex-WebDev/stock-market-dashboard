import React, { useState, useEffect } from "react";
import { motion as m } from "framer-motion";
import {
  RiEyeLine,
  RiEyeOffLine,
  RiHome6Line,
  RiDashboardLine,
  RiWallet3Line,
  RiNewspaperLine,
  RiCommunityLine,
  RiSettings4Line,
  RiPhoneLine,
} from "../icons/icons";

/**
 * Sidebar component for displaying branding and total investment summary with menu links.
 * @returns {JSX.Element} The Sidebar JSX structure.
 */
const Sidebar: React.FC = () => {
  // State to track the visibility of the total investment amount
  const [isInvestmentHidden, setIsInvestmentHidden] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state for skeleton animation

  // Simulate loading for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Load the visibility state from local storage when the component mounts
  useEffect(() => {
    const savedState = localStorage.getItem("isInvestmentHidden");
    if (savedState !== null) {
      setIsInvestmentHidden(JSON.parse(savedState));
    }
  }, []);

  // Update local storage whenever the state changes
  useEffect(() => {
    localStorage.setItem(
      "isInvestmentHidden",
      JSON.stringify(isInvestmentHidden),
    );
  }, [isInvestmentHidden]);

  /**
   * Toggles the visibility of the total investment by adding/removing a blur effect.
   */
  const toggleInvestmentVisibility = () => {
    setIsInvestmentHidden((prev) => !prev);
  };

  // Skeleton shimmer animation
  const shimmerVariants = {
    loading: {
      backgroundPosition: "200% 0",
    },
    loaded: {
      opacity: 1,
    },
  };

  const navLinks = [
    { icon: <RiHome6Line size={20} />, label: "Home" },
    { icon: <RiDashboardLine size={20} />, label: "Dashboard" },
    { icon: <RiWallet3Line size={20} />, label: "Wallet" },
    { icon: <RiNewspaperLine size={20} />, label: "News" },
  ];

  const footerLinks = [
    { icon: <RiCommunityLine size={20} />, label: "Community" },
    { icon: <RiSettings4Line size={20} />, label: "Settings" },
    { icon: <RiPhoneLine size={20} />, label: "Contact us" },
  ];

  return (
    <div className="sticky top-0 flex h-screen w-0 flex-col items-center justify-between gap-8 border-r-2 border-gray-200 bg-white p-8 sm:w-[25%] sm:min-w-80">
      {/* Container for the logo and total investment sections */}
      <div className="flex w-full flex-col items-center justify-center gap-8">
        {/* Logo Section */}
        <div
          className="flex h-auto w-full flex-col items-center justify-center font-bold uppercase"
          title="Go To HomePage"
        >
          <img
            src="images/smd-logo.svg"
            alt="Stock Market Dashboard company logo"
            className="h-auto w-1/2 cursor-pointer"
          />
          <span className="cursor-pointer text-base">Stock Market</span>
          <span className="-mt-1 cursor-pointer text-xl">Dashboard</span>
        </div>

        {/* Total Investment Section with Skeleton */}
        <m.div
          className="flex w-full rounded-xl bg-black text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0.5 : 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Left side of the investment summary */}
          <div className="flex w-2/3 flex-col items-start gap-1 rounded-l-lg p-4">
            <span className="text-xs opacity-90">Total Investment</span>

            <div className="flex items-center justify-center gap-2 text-xl font-semibold">
              {/* Show shimmer effect while loading */}
              {isLoading ? (
                <m.div
                  className="h-5 w-24 animate-pulse rounded bg-gray-200"
                  variants={shimmerVariants}
                />
              ) : (
                <span
                  className={`select-none transition-all ${
                    isInvestmentHidden ? "blur-sm" : ""
                  }`}
                >
                  $5380.90
                </span>
              )}

              {/* Toggle between eye and eye-off icons */}
              {isInvestmentHidden ? (
                <RiEyeOffLine
                  size={14}
                  className="cursor-pointer"
                  tabIndex={0}
                  role="button"
                  aria-label="Show total investment"
                  title="Show total investment"
                  onClick={toggleInvestmentVisibility}
                />
              ) : (
                <RiEyeLine
                  size={14}
                  className="cursor-pointer"
                  tabIndex={0}
                  role="button"
                  aria-label="Hide total investment"
                  title="Hide total investment"
                  onClick={toggleInvestmentVisibility}
                />
              )}
            </div>
          </div>

          {/* Right side showing the percentage change */}
          <div
            className={`flex w-1/3 items-center justify-center rounded-r-lg border-l-2 border-zinc-900 bg-zinc-950 p-4`}
          >
            {/* Show shimmer effect while loading */}
            {isLoading ? (
              <m.div
                className="h-5 w-24 animate-pulse rounded bg-gray-200"
                variants={shimmerVariants}
              />
            ) : (
              <m.span
                className={`${isInvestmentHidden ? "blur-sm" : ""} select-none text-xs text-green-400 transition-all`}
              >
                +19.90%
              </m.span>
            )}
          </div>
        </m.div>

        {/* Navigation Links with Skeleton */}
        <nav aria-label="Main Navigation" className="w-full">
          <ul className="flex w-full flex-col gap-1">
            {navLinks.map((link, idx) => (
              <m.li
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoading ? 0.5 : 1 }}
                transition={{ duration: 0.8, delay: 0.2 * idx }}
              >
                {isLoading ? (
                  <div className="h-10 w-full animate-pulse rounded-xl bg-gray-200" />
                ) : (
                  <div
                    className={`flex w-full cursor-pointer items-center gap-2 rounded-xl p-2 py-4 text-sm font-semibold transition-all hover:bg-[#f5f7f9] ${link.label === "Dashboard" ? "bg-[#f5f7f9]" : "bg-white"}`}
                    tabIndex={0}
                    role="link"
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </div>
                )}
              </m.li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Footer Links with Skeleton */}
      <nav aria-label="Footer Navigation" className="w-full">
        <ul className="flex w-full flex-col gap-1">
          {footerLinks.map((link, idx) => (
            <m.li
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoading ? 0.5 : 1 }}
              transition={{ duration: 0.8, delay: 0.2 * idx }}
            >
              {isLoading ? (
                <div className="h-10 w-full animate-pulse rounded-xl bg-gray-200" />
              ) : (
                <div
                  className="flex w-full cursor-pointer items-center gap-2 rounded-xl bg-white p-2 py-4 text-sm font-semibold transition-all hover:bg-[#f5f7f9]"
                  tabIndex={0}
                  role="link"
                >
                  {link.icon}
                  <span>{link.label}</span>
                </div>
              )}
            </m.li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
