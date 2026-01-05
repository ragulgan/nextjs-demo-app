import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { departmentUpdate } from "@/api/authApi";

export const departmentUpdateMethod = createAsyncThunk('department/update', async ({ id, data }, thunkAPI) => {
    try {
        const response = await departmentUpdate(id, data);
        return response.data;
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data || err.message);
    }
});

const departmentUpdateSlice = createSlice({
    name: 'departmentUpdate',
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
            .addCase(departmentUpdateMethod.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(departmentUpdateMethod.fulfilled, (state, action) => {
                state.loading = false;
                const payload: any = action.payload;
                state.user = payload.data;
                state.code = payload.code;
                state.messageCode = payload.messageCode;
                state.message = payload.message;
                state.error = null;
            })
            .addCase(departmentUpdateMethod.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                const payload: any = action.payload;
                state.code = payload?.code;
                state.messageCode = payload?.messageCode;
                state.error = payload?.message || 'Failed to update college';
            });
    },
});

export default departmentUpdateSlice.reducer;
