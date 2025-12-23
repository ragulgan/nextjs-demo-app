import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../../api/authApi";

type Credentials = { email: string; password: string };

interface AuthUserState {
  user: any;
  token: any;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: any;
}

const initialToken =
  typeof window !== "undefined" ? localStorage.getItem("userInfo") : null;

const initialState: AuthUserState = {
  user: null,
  token: initialToken,
  status: "idle",
  error: null,
};

export const login_User = createAsyncThunk(
  "login/user",
  async (credentials: Credentials, thunkAPI) => {
    try {
      const response = await loginUser(credentials);
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
        localStorage.removeItem("userInfo");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login_User.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login_User.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload?.data;
        state.user = action.payload?.data;
        if (typeof window !== "undefined") {
          localStorage.setItem("userInfo", JSON.stringify(action.payload?.data));
        }
      })
      .addCase(login_User.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;