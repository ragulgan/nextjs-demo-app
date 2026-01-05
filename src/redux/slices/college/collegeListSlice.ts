import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collegeList } from '@/api/authApi';

export const fetchCollegeList = createAsyncThunk('college/list', async (params, { rejectWithValue }) => {
    try {
        const response = await collegeList(params);
        return response;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || error.message);
    }
}
);

const collegeListSlice = createSlice({
    name: 'collegeList',
    initialState: {
        users: [],
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
            .addCase(fetchCollegeList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCollegeList.fulfilled, (state, action) => {
                state.loading = false;
                const payload: any = action.payload;
                state.users = payload.data || [];
                state.count = payload.count || 0;
                state.code = payload.code;
                state.messageCode = payload.messageCode;
                state.message = payload.message;
                state.error = null;
            })
            .addCase(fetchCollegeList.rejected, (state, action) => {
                state.loading = false;
                state.users = [];
                state.count = 0;
                const payload: any = action.payload;
                state.code = payload?.code;
                state.messageCode = payload?.messageCode;
                state.error = payload?.message || 'Failed to fetch college list';
            });
    },
});

export default collegeListSlice.reducer;