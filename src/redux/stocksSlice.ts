import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Coin, HistoricalData } from "../types";
import { searchCoins, fetchCoinHistoricalDataByRange } from "../api/stockAPI";

interface StocksState {
  stocks: Coin[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  selectedCoin: Coin | null;
  historicalData: HistoricalData | null; // For storing historical data
  historicalDataStatus: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: StocksState = {
  stocks: [],
  status: "idle",
  error: null,
  selectedCoin: null,
  historicalData: null,
  historicalDataStatus: "idle",
};

// Thunk to search for coins by term
export const fetchStocks = createAsyncThunk(
  "stocks/fetchStocks",
  async (searchTerm: string, { rejectWithValue }) => {
    try {
      const response = await searchCoins(searchTerm);
      return response;
    } catch (error) {
      return rejectWithValue("Failed to fetch stocks");
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
      return response;
    } catch (error) {
      return rejectWithValue("Failed to fetch historical data");
    }
  },
);

const stocksSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    selectCoin(state, action: PayloadAction<Coin>) {
      state.selectedCoin = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch coins by term
    builder
      .addCase(fetchStocks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchStocks.fulfilled,
        (state, action: PayloadAction<Coin[]>) => {
          state.status = "succeeded";
          state.stocks = action.payload;
          const bitcoin = action.payload.find((coin) => coin.id === "bitcoin");
          if (bitcoin) {
            state.selectedCoin = bitcoin;
          }
        },
      )
      .addCase(fetchStocks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // Fetch historical data
    builder
      .addCase(fetchHistoricalData.pending, (state) => {
        state.historicalDataStatus = "loading";
      })
      .addCase(
        fetchHistoricalData.fulfilled,
        (state, action: PayloadAction<HistoricalData>) => {
          state.historicalDataStatus = "succeeded";
          state.historicalData = action.payload;
        },
      )
      .addCase(fetchHistoricalData.rejected, (state, action) => {
        state.historicalDataStatus = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { selectCoin } = stocksSlice.actions;

export default stocksSlice.reducer;
