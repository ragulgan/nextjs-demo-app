import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { courseUpdate } from "@/api/authApi";

export const courseUpdateMethod = createAsyncThunk('course/update', async ({ id, data }, thunkAPI) => {
    try {
        const response = await courseUpdate(id, data);
        return response.data;
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data || err.message);
    }
});

const courseUpdateSlice = createSlice({
    name: 'courseUpdate',
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
            .addCase(courseUpdateMethod.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(courseUpdateMethod.fulfilled, (state, action) => {
                state.loading = false;
                const payload: any = action.payload;
                state.course = payload.data;
                state.code = payload.code;
                state.messageCode = payload.messageCode;
                state.message = payload.message;
                state.error = null;
            })
            .addCase(courseUpdateMethod.rejected, (state, action) => {
                state.loading = false;
                state.course = null;
                const payload: any = action.payload;
                state.code = payload?.code;
                state.messageCode = payload?.messageCode;
                state.error = payload?.message || 'Failed to update college';
            });
    },
});

export default courseUpdateSlice.reducer;
