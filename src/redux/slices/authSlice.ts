import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAdmin } from "../../api/authApi";

type Credentials = { email: string; password: string };

interface AuthState {
  user: any;
  token: any;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: any;
}

const initialToken =
  typeof window !== "undefined" ? localStorage.getItem("adminInfo") : null;

const initialState: AuthState = {
  user: null,
  token: initialToken,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "login/admin",
  async (credentials: Credentials, thunkAPI) => {
    try {
      const response = await loginAdmin(credentials);
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("adminInfo");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload?.data;
        state.user = action.payload?.data;
        if (typeof window !== "undefined") {
          localStorage.setItem("adminInfo", JSON.stringify(action.payload?.data));
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;