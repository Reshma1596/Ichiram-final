import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: "",
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    fetchMenuStart: (state) => {
      state.loading = true;
      state.error = "";
    },
    fetchMenuSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
    },
    fetchMenuFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchMenuStart,
  fetchMenuSuccess,
  fetchMenuFailure,
} = menuSlice.actions;

export const selectMenuState = (state) => state.menu ?? initialState;
export const selectMenuItems = (state) => selectMenuState(state).items;
export const selectMenuLoading = (state) => selectMenuState(state).loading;
export const selectMenuError = (state) => selectMenuState(state).error;

export default menuSlice.reducer;