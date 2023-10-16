import { configureStore } from "@reduxjs/toolkit";
import { homeSlice } from "./features/home/HomeSlice";

export const store = configureStore({
  reducer: {
    home: homeSlice,
  },
});
