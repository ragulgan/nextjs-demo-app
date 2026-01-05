import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDepartmentById } from "@/api/authApi";

export const fetchDepartmentById = createAsyncThunk('department/fetchById', async (id: string, { rejectWithValue }) => {
    try {
        const response = await getDepartmentById(id);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

const departmentEditSlice = createSlice({
    name: 'departmentEdit',
    initialState: {
        college: null,
        loading: false,
        error: null,
        code: null,
        messageCode: null,
        message: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDepartmentById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDepartmentById.fulfilled, (state, action) => {
                state.loading = false;
                const payload: any = action.payload;
                state.college = payload.data;
                state.code = payload.code;
                state.messageCode = payload.messageCode;
                state.message = payload.message;
                state.error = null;
            })
            .addCase(fetchDepartmentById.rejected, (state, action) => {
                state.loading = false;
                state.college = null;
                const payload: any = action.payload;
                state.code = payload?.code;
                state.messageCode = payload?.messageCode;
                state.error = payload?.message || 'Failed to fetch college';
            });
    },
});

export default departmentEditSlice.reducer;
