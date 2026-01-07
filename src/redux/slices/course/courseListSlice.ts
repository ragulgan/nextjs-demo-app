import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { courseList } from '@/api/authApi';

export const fetchCourseList = createAsyncThunk('course/list', async (params, { rejectWithValue }) => {
    try {
        const response = await courseList(params);
        return response;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || error.message);
    }
}
);

const courseListSlice = createSlice({
    name: 'courseList',
    initialState: {
        course: [],
        count: 0,
        loading: false,
        error: null,
        code: null,
        messageCode: null,
        message: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourseList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCourseList.fulfilled, (state, action) => {
                state.loading = false;
                const payload: any = action.payload;
                state.course = payload.data || [];
                state.count = payload.count || 0;
                state.code = payload.code;
                state.messageCode = payload.messageCode;
                state.message = payload.message;
                state.error = null;
            })
            .addCase(fetchCourseList.rejected, (state, action) => {
                state.loading = false;
                state.course = [];
                state.count = 0;
                const payload: any = action.payload;
                state.code = payload?.code;
                state.messageCode = payload?.messageCode;
                state.error = payload?.message || 'Failed to fetch course list';
            });
    },
});

export default courseListSlice.reducer;