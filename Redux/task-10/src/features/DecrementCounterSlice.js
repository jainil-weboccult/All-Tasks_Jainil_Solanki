import { createSlice } from "@reduxjs/toolkit";
import { incrementSlice } from "./IncrementCounterSlice";


export const decrementCounter = createSlice({
  name: "decrementCounter",
  initialState: {
    value:0,
  },
  reducers: {
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { decrement } = decrementCounter.actions;

export default decrementCounter.reducer;
