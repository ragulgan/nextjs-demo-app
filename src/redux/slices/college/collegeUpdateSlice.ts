import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collegeUpdate } from "@/api/authApi";

export const userUpdateMethod = createAsyncThunk('college/update', async ({ id, data }, thunkAPI) => {
    try {
        const response = await collegeUpdate(id, data);
        return response.data;
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data || err.message);
    }
});

const userUpdateSlice = createSlice({
    name: 'collegeUpdate',
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
            .addCase(userUpdateMethod.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userUpdateMethod.fulfilled, (state, action) => {
                state.loading = false;
                const payload: any = action.payload;
                state.user = payload.data;
                state.code = payload.code;
                state.messageCode = payload.messageCode;
                state.message = payload.message;
                state.error = null;
            })
            .addCase(userUpdateMethod.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                const payload: any = action.payload;
                state.code = payload?.code;
                state.messageCode = payload?.messageCode;
                state.error = payload?.message || 'Failed to update college';
            });
    },
});

export default userUpdateSlice.reducer;
