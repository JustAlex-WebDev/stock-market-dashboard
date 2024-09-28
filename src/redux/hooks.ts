import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

/**
 * Custom hook to access the app's dispatch function with correct typing.
 * @returns {AppDispatch} The typed dispatch function
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Custom hook to access the app's state with correct typing.
 * @returns {RootState} The typed state
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
