import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAdmin } from "../../../api/authApi";

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
      // AxiosInterceptor already returns response.data, so response is the full API response
      return response;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.response?.data || err);
    }
  }
);

const authSlice = createSlice({
  name: "auth/admin",
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
        // action.payload is { code, messageCode, data: {...user data with token}, message }
        const userData = action.payload?.data;
        state.token = userData?.token;
        state.user = userData;
        if (typeof window !== "undefined" && userData) {
          localStorage.setItem("adminInfo", JSON.stringify(userData));
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