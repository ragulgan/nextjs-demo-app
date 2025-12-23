// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import authUserReducer from "./slices/authUserSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    authUser: authUserReducer,
  },
});
export default store;