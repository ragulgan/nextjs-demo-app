import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { departmentAdd } from "@/api/authApi";

export const departmentAddMethod = createAsyncThunk('department/add', async (data, thunkAPI) => {
    try {
        const response = await departmentAdd(data);
        return response.data;
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

const departmentAddSlice = createSlice({
    name: 'departmentAdd',
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
            .addCase(departmentAddMethod.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(departmentAddMethod.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.code = action.payload.code;
                state.messageCode = action.payload.messageCode;
                state.message = action.payload.message;
                state.error = null;
            })
            .addCase(departmentAddMethod.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                const payload: any = action.payload;
                state.code = payload?.code;
                state.messageCode = payload?.messageCode;
                state.error = payload?.message || 'Failed to add college';
            });
    },
});

export default departmentAddSlice.reducer;
