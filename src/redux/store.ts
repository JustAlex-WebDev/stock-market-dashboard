import { configureStore } from "@reduxjs/toolkit";
import stocksReducer from "./stocksSlice";

// Configure and create the Redux store
export const store = configureStore({
  reducer: {
    stocks: stocksReducer, // Add stock data slice to the store
  },
});

// Types for the RootState and AppDispatch to use across the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
