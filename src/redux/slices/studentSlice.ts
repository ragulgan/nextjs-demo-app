import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as studentApi from "../../api/studentApi";

interface Student {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  dateOfBirth?: string;
  address?: string;
  enrollmentDate?: string;
  status?: string;
  departmentId?: string;
}

interface StudentState {
  students: Student[];
  currentStudent: Student | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: any;
}

const initialState: StudentState = {
  students: [],
  currentStudent: null,
  status: "idle",
  error: null,
};

export const fetchStudents = createAsyncThunk(
  "students/fetchAll",
  async (params?: any, thunkAPI) => {
    try {
      const response = await studentApi.getStudents(params);
      return response;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.response?.data || err);
    }
  }
);

export const fetchStudentById = createAsyncThunk(
  "students/fetchById",
  async (id: string, thunkAPI) => {
    try {
      const response = await studentApi.getStudentById(id);
      return response;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.response?.data || err);
    }
  }
);

export const createStudent = createAsyncThunk(
  "students/create",
  async (data: Student, thunkAPI) => {
    try {
      const response = await studentApi.createStudent(data);
      return response;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.response?.data || err);
    }
  }
);

export const updateStudent = createAsyncThunk(
  "students/update",
  async ({ id, data }: { id: string; data: Student }, thunkAPI) => {
    try {
      const response = await studentApi.updateStudent(id, data);
      return response;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.response?.data || err);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "students/delete",
  async (id: string, thunkAPI) => {
    try {
      await studentApi.deleteStudent(id);
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.response?.data || err);
    }
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    clearCurrentStudent: (state) => {
      state.currentStudent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        const payload = action.payload;
        // Handle different response structures
        if (Array.isArray(payload)) {
          state.students = payload;
        } else if (payload?.data && Array.isArray(payload.data)) {
          state.students = payload.data;
        } else if (payload?.data && !Array.isArray(payload.data)) {
          // If data is a single object, wrap it in an array
          state.students = [payload.data];
        } else {
          state.students = [];
        }
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchStudentById.fulfilled, (state, action) => {
        state.currentStudent = action.payload?.data || action.payload;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        const newStudent = action.payload?.data || action.payload;
        state.students.push(newStudent);
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const updatedStudent = action.payload?.data || action.payload;
        const index = state.students.findIndex((s) => s.id === updatedStudent.id);
        if (index !== -1) {
          state.students[index] = updatedStudent;
        }
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter((s) => s.id !== action.payload);
      });
  },
});

export const { clearCurrentStudent } = studentSlice.actions;
export default studentSlice.reducer;

