import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collegeAdd } from "@/api/authApi";

export const userAddMethod = createAsyncThunk('college/add', async (data, thunkAPI) => {
    try {
        const response = await collegeAdd(data);
        return response.data;
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

const userAddSlice = createSlice({
    name: 'collegeAdd',
    initialState: {
        user: null,
        loading: false,
        error: null,
        code: null,
        messageCode: null,
        message: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userAddMethod.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userAddMethod.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.code = action.payload.code;
                state.messageCode = action.payload.messageCode;
                state.message = action.payload.message;
                state.error = null;
            })
            .addCase(userAddMethod.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                const payload: any = action.payload;
                state.code = payload?.code;
                state.messageCode = payload?.messageCode;
                state.error = payload?.message || 'Failed to add college';
            });
    },
});

export default userAddSlice.reducer;
