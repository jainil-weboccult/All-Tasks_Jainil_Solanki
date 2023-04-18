import { createSlice } from "@reduxjs/toolkit";

export const incrementSlice = createSlice({
  name: "incrementCounter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment } = incrementSlice.actions;

export default incrementSlice.reducer;
