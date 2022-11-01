import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import productReducer from "store/slice/productSlice";
import authReducer from "store/slice/authSlice";
import mediaReducer from "store/slice/mediaSlice";
import userReducer from "store/slice/userSlice";
import transactionReducer from "store/slice/transactionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    media: mediaReducer,
    product: productReducer,
    user: userReducer,
    transaction: transactionReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
