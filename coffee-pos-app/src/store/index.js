import { configureStore } from "@reduxjs/toolkit";

import authReducer from "store/slice/authSlice";
import mediaReducer from "store/slice/mediaSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    media: mediaReducer,
  },
});
