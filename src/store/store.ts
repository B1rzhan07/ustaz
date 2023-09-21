import { configureStore } from "@reduxjs/toolkit";
import defenceReducer from "./Slices/defenceSlice";
import { secretaryApi } from "./feautures/getFinalGrades";

const store = configureStore({
  reducer: {
    defence: defenceReducer,
    [secretaryApi.reducerPath]: secretaryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(secretaryApi.middleware),

});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
