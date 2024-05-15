"use client";
import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { SinglePickProps } from "@/components/PicksPageComps/PicksList";
// Define the shape of a game object

// Adjust GlobalState to hold a singular game object
interface GlobalState {
  currentGame: SinglePickProps | null;
}

// Adjust action types for managing a singular game object
type Action =
  | { type: "SET_GAME"; payload: SinglePickProps }
  | { type: "CLEAR_GAME" };

// Define the initial state to try loading from localStorage, or null if not found
const initialState: GlobalState = {
  currentGame:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("currentGame") || "null")
      : null,
};

// Create a context
const GlobalStateContext = createContext<
  { state: GlobalState; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

// Adjust reducer for a singular game object
const reducer = (state: GlobalState, action: Action): GlobalState => {
  switch (action.type) {
    case "SET_GAME":
      return { ...state, currentGame: action.payload };
    case "CLEAR_GAME":
      return { ...state, currentGame: null };
    default:
      return state;
  }
};

// Custom hook for easier consumption of the context
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

// Provider component that wraps your application
interface GlobalStateProviderProps {
  children: ReactNode;
}

export const GlobalStateProvider = ({ children }: GlobalStateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Effect to save the current game to localStorage when it changes
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCurrentGame = localStorage.getItem("currentGame");
      const parsedCurrentGame = storedCurrentGame
        ? JSON.parse(storedCurrentGame)
        : null;
      dispatch({ type: "SET_GAME", payload: parsedCurrentGame });
    }
  }, []);

  // Effect to save the current game to localStorage when it changes
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if (state.currentGame) {
        localStorage.setItem("currentGame", JSON.stringify(state.currentGame));
      } else {
        localStorage.removeItem("currentGame"); // Clear the stored game if currentGame is null
      }
    }
  }, [state.currentGame]);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
