import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchStockDataFromAPI } from "../api/stockAPI";
import { Stock } from "../types";

// Define the initial state for the stocks slice
interface StocksState {
  data: Stock[];
  loading: boolean;
  error: string | null;
}

const initialState: StocksState = {
  data: [],
  loading: false,
  error: null,
};

// Asynchronous thunk to fetch stock data
export const fetchStockData = createAsyncThunk(
  "stocks/fetchStockData",
  async () => {
    const data = await fetchStockDataFromAPI(); // Fetch from API
    return data; // Return the stock data
  },
);

// Create the stocks slice with reducers and extra reducers for async actions
const stocksSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockData.pending, (state) => {
        state.loading = true; // Set loading state when the fetch is pending
        state.error = null;
      })
      .addCase(fetchStockData.fulfilled, (state, action) => {
        state.loading = false; // Set loading state to false when data is received
        state.data = action.payload; // Set the data from the API
      })
      .addCase(fetchStockData.rejected, (state, action) => {
        state.loading = false; // Stop loading if the fetch fails
        state.error = action.error.message || "Failed to fetch stock data"; // Store the error message
      });
  },
});

// Export the reducer to be included in the store
export default stocksSlice.reducer;
