import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  total: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.total += 1;
    },
    decrement: (state) => {
      state.total -= 1;
    },
    incrementByAmount: (state, action) => {
      state.total += action.payload;
    },
    extraReducers: (builder) => {
      builder.addCase(PURGE, (state) => {
        customEntityAdapter.removeAll(state);
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
