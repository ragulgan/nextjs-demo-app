// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import authUserReducer from "./slices/auth/authUserSlice";
import studentReducer from "./slices/studentSlice";
import collegeListReducer from "./slices/college/collegeListSlice";
import collegeAddReducer from "./slices/college/collegeAddSlice";
import collegeUpdateReducer from "./slices/college/collegeUpdateSlice";
import collegeEditReducer from "./slices/college/collegeEditSlice";
import collegeDeleteReducer from "./slices/college/collegeDeleteSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    authUser: authUserReducer,
    students: studentReducer,

    // College reducers
    collegeList: collegeListReducer,
    collegeAdd: collegeAddReducer,
    collegeUpdate: collegeUpdateReducer,
    collegeEdit: collegeEditReducer,
    collegeDelete: collegeDeleteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;