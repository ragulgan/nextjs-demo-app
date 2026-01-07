import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteCourse } from "@/api/authApi";

export const deleteCourseMethod = createAsyncThunk('course/delete', async (id: string, { rejectWithValue }) => {
    try {
        const response = await deleteCourse(id);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

const courseDeleteSlice = createSlice({
    name: 'courseDelete',
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
            .addCase(deleteCourseMethod.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCourseMethod.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                const payload: any = action.payload;
                state.code = payload.code;
                state.messageCode = payload.messageCode;
                state.message = payload.message;
                state.error = null;
            })
            .addCase(deleteCourseMethod.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                const payload: any = action.payload;
                state.code = payload?.code;
                state.messageCode = payload?.messageCode;
                state.error = payload?.message || 'Failed to delete college';
            });
    },
});

export default courseDeleteSlice.reducer;
