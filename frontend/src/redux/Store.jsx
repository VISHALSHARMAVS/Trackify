import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Feature/Auth/AuthSlice";
import productReducer from "./Feature/Product/ProductSlice";
import filterReducer from "./Feature/Product/FilterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    filter: filterReducer,
  },
});