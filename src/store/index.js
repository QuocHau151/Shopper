import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authReducer";
import { cacheReducer } from "./reduxReducer";

const reducers = combineReducers({
  auth: authReducer,
  cache: cacheReducer,
});

export const store = configureStore({
  reducer: reducers,
  devTools: true,
  // devTools: import.meta.env.VITE_NODE_ENV === "development",
});
