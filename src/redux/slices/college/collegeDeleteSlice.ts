import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteCollege } from "@/api/authApi";

export const deleteCollegeMethod = createAsyncThunk('college/delete', async (id: string, { rejectWithValue }) => {
    try {
        const response = await deleteCollege(id);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

const collegeDeleteSlice = createSlice({
    name: 'collegeDelete',
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
            .addCase(deleteCollegeMethod.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCollegeMethod.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                const payload: any = action.payload;
                state.code = payload.code;
                state.messageCode = payload.messageCode;
                state.message = payload.message;
                state.error = null;
            })
            .addCase(deleteCollegeMethod.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                const payload: any = action.payload;
                state.code = payload?.code;
                state.messageCode = payload?.messageCode;
                state.error = payload?.message || 'Failed to delete college';
            });
    },
});

export default collegeDeleteSlice.reducer;
