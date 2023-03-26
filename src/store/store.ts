import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./Slices/profileSlice";
// import { ProfileSlice } from "./Slices/profileSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
