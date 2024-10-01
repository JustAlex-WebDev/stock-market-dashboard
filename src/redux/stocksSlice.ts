import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Coin, HistoricalData } from "../types";
import { searchCoins, fetchCoinHistoricalDataByRange } from "../api/stockAPI";

// Interface for the stocks slice state
interface StocksState {
  stocks: Coin[]; // Array of stocks (coins)
  status: "idle" | "loading" | "succeeded" | "failed"; // Status of stocks fetching
  error: string | null; // Error message if fetching fails
  selectedCoin: Coin | null; // The currently selected coin
  historicalData: HistoricalData | null; // For storing historical data of a selected coin
  historicalDataStatus: "idle" | "loading" | "succeeded" | "failed"; // Status of historical data fetching
}

// Initial state for the stocks slice
const initialState: StocksState = {
  stocks: [],
  status: "idle",
  error: null,
  selectedCoin: null,
  historicalData: null,
  historicalDataStatus: "idle",
};

// Thunk to search for coins by search term
export const fetchStocks = createAsyncThunk(
  "stocks/fetchStocks",
  async (searchTerm: string, { rejectWithValue }) => {
    try {
      const response = await searchCoins(searchTerm); // Fetch coins based on the search term
      return response; // Return the fetched coins
    } catch (error) {
      return rejectWithValue("Failed to fetch stocks"); // Handle fetch error
    }
  },
);

// Thunk to fetch historical data of a selected coin
export const fetchHistoricalData = createAsyncThunk(
  "stocks/fetchHistoricalData",
  async (
    {
      id,
      vsCurrency,
      from,
      to,
    }: { id: string; vsCurrency: string; from: number; to: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetchCoinHistoricalDataByRange(
        id,
        from,
        to,
        vsCurrency,
      );
      return response; // Return historical data
    } catch (error) {
      return rejectWithValue("Failed to fetch historical data"); // Handle fetch error
    }
  },
);

// Create the stocks slice
const stocksSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    selectCoin(state, action: PayloadAction<Coin>) {
      state.selectedCoin = action.payload; // Set the selected coin
    },
  },
  extraReducers: (builder) => {
    // Handle fetch stocks actions
    builder
      .addCase(fetchStocks.pending, (state) => {
        state.status = "loading"; // Set status to loading
      })
      .addCase(
        fetchStocks.fulfilled,
        (state, action: PayloadAction<Coin[]>) => {
          state.status = "succeeded"; // Set status to succeeded
          state.stocks = action.payload; // Update stocks with fetched data
          const bitcoin = action.payload.find((coin) => coin.id === "bitcoin");
          if (bitcoin) {
            state.selectedCoin = bitcoin; // Set bitcoin as the selected coin if found
          }
        },
      )
      .addCase(fetchStocks.rejected, (state, action) => {
        state.status = "failed"; // Set status to failed
        state.error = action.payload as string; // Store error message
      });

    // Handle fetch historical data actions
    builder
      .addCase(fetchHistoricalData.pending, (state) => {
        state.historicalDataStatus = "loading"; // Set status to loading for historical data
      })
      .addCase(
        fetchHistoricalData.fulfilled,
        (state, action: PayloadAction<HistoricalData>) => {
          state.historicalDataStatus = "succeeded"; // Set status to succeeded
          state.historicalData = action.payload; // Store historical data
        },
      )
      .addCase(fetchHistoricalData.rejected, (state, action) => {
        state.historicalDataStatus = "failed"; // Set status to failed
        state.error = action.payload as string; // Store error message
      });
  },
});

// Export actions and reducer
export const { selectCoin } = stocksSlice.actions;
export default stocksSlice.reducer;
