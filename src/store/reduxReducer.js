import { createSlice } from "@reduxjs/toolkit";

export const setCacheAction = () => {};
export const { reducer: cacheReducer, actions: cacheActions } = createSlice({
  initialState: {},
  name: "cache",
  reducers: {
    set: (state, action) => {
      state[action.payload.name] = action.payload.data;
    },
  },
});
