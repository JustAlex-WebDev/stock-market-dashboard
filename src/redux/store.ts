import { configureStore } from "@reduxjs/toolkit";
import stocksReducer from "./stocksSlice"; // Import your slice/reducer
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

// Configure the store with reducers and middleware (if needed)
export const store = configureStore({
  reducer: {
    stocks: stocksReducer,
  },
});

// Export RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>; // Infer the RootState type
export type AppDispatch = typeof store.dispatch; // Infer AppDispatch type

// Custom hooks for typed dispatch and selector
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Typed dispatch hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // Typed selector hook
