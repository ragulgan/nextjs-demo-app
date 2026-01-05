import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteDepartment } from "@/api/authApi";

export const deleteDepartmentMethod = createAsyncThunk('department/delete', async (id: string, { rejectWithValue }) => {
    try {
        const response = await deleteDepartment(id);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

const departmentDeleteSlice = createSlice({
    name: 'departmentDelete',
    initialState: {
        success: false,
        loading: false,
        error: null,
        code: null,
        messageCode: null,
        message: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteDepartmentMethod.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteDepartmentMethod.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                const payload: any = action.payload;
                state.code = payload.code;
                state.messageCode = payload.messageCode;
                state.message = payload.message;
                state.error = null;
            })
            .addCase(deleteDepartmentMethod.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                const payload: any = action.payload;
                state.code = payload?.code;
                state.messageCode = payload?.messageCode;
                state.error = payload?.message || 'Failed to delete college';
            });
    },
});

export default departmentDeleteSlice.reducer;
