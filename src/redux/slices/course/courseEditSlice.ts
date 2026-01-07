import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCourseById } from "@/api/authApi";

export const fetchCourseById = createAsyncThunk('course/fetchById', async (id: string, { rejectWithValue }) => {
    try {
        const response = await getCourseById(id);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

const courseEditSlice = createSlice({
    name: 'courseEdit',
    initialState: {
        course: null,
        loading: false,
        error: null,
        code: null,
        messageCode: null,
        message: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourseById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCourseById.fulfilled, (state, action) => {
                state.loading = false;
                const payload: any = action.payload;
                state.course = payload.data;
                state.code = payload.code;
                state.messageCode = payload.messageCode;
                state.message = payload.message;
                state.error = null;
            })
            .addCase(fetchCourseById.rejected, (state, action) => {
                state.loading = false;
                state.course = null;
                const payload: any = action.payload;
                state.code = payload?.code;
                state.messageCode = payload?.messageCode;
                state.error = payload?.message || 'Failed to fetch college';
            });
    },
});

export default courseEditSlice.reducer;
