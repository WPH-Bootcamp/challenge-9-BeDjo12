import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/authSlice";
import cartReducer from "@/features/cart/cartSlice";
import filtersReducer from "@/features/filters/filterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
