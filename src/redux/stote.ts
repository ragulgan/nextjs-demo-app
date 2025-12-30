// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import authUserReducer from "./slices/authUserSlice";
import studentReducer from "./slices/studentSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    authUser: authUserReducer,
    students: studentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;