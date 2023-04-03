import { configureStore } from "@reduxjs/toolkit";
import defenceReducer from "./Slices/defenceSlice";

const store = configureStore({
  reducer: {
    defence: defenceReducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
