import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { courseAdd } from "@/api/authApi";

export const courseAddMethod = createAsyncThunk('course/add', async (data, thunkAPI) => {
    try {
        const response = await courseAdd(data);
        return response.data;
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

const courseAddSlice = createSlice({
    name: 'courseAdd',
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
            .addCase(courseAddMethod.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(courseAddMethod.fulfilled, (state, action) => {
                state.loading = false;
                state.course = action.payload.data;
                state.code = action.payload.code;
                state.messageCode = action.payload.messageCode;
                state.message = action.payload.message;
                state.error = null;
            })
            .addCase(courseAddMethod.rejected, (state, action) => {
                state.loading = false;
                state.course = null;
                const payload: any = action.payload;
                state.code = payload?.code;
                state.messageCode = payload?.messageCode;
                state.error = payload?.message || 'Failed to add college';
            });
    },
});

export default courseAddSlice.reducer;
