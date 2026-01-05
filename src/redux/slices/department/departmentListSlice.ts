import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { departmentList } from '@/api/authApi';

export const fetchDepartmentList = createAsyncThunk('department/list', async (params, { rejectWithValue }) => {
    try {
        const response = await departmentList(params);
        return response;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || error.message);
    }
}
);

const departmentListSlice = createSlice({
    name: 'departmentList',
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
            .addCase(fetchDepartmentList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDepartmentList.fulfilled, (state, action) => {
                state.loading = false;
                const payload: any = action.payload;
                state.users = payload.data || [];
                state.count = payload.count || 0;
                state.code = payload.code;
                state.messageCode = payload.messageCode;
                state.message = payload.message;
                state.error = null;
            })
            .addCase(fetchDepartmentList.rejected, (state, action) => {
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

export default departmentListSlice.reducer;