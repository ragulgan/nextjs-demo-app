import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "@/components/common/DataTable";
import StudentFormDialog from "@/components/students/StudentFormDialog";
import {
  fetchStudents,
  deleteStudent,
  clearCurrentStudent,
} from "@/redux/slices/studentSlice";
import { useSnackbar } from "@/components/common/snackbar";
import { AppDispatch } from "@/redux/stote";

const StudentsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { students, status } = useSelector((state: any) => state.students);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchStudents({}));
  }, [dispatch]);

  const handleAdd = () => {
    setEditingStudent(null);
    setOpenDialog(true);
  };

  const handleEdit = (student: any) => {
    setEditingStudent(student);
    setOpenDialog(true);
  };

  const handleDelete = async (student: any) => {
    if (window.confirm(`Are you sure you want to delete ${student.firstName} ${student.lastName}?`)) {
      try {
        await dispatch(deleteStudent(student.id)).unwrap();
        enqueueSnackbar("Student deleted successfully", "success");
        dispatch(fetchStudents({}));
      } catch (error: any) {
        enqueueSnackbar(error?.msg || "Failed to delete student", "error");
      }
    }
  };

  const handleView = (student: any) => {
    router.push(`/students/${student.id}`);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingStudent(null);
    dispatch(clearCurrentStudent());
  };

  const handleSubmitSuccess = () => {
    handleCloseDialog();
    dispatch(fetchStudents({}));
  };

  // Ensure students is always an array
  const studentsArray = Array.isArray(students) ? students : [];

  const filteredStudents = studentsArray.filter((student: any) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      student.firstName?.toLowerCase().includes(searchLower) ||
      student.lastName?.toLowerCase().includes(searchLower) ||
      student.email?.toLowerCase().includes(searchLower) ||
      student.mobileNumber?.includes(searchTerm)
    );
  });

  const columns = [
    { id: "firstName", label: "First Name", minWidth: 150 },
    { id: "lastName", label: "Last Name", minWidth: 150 },
    { id: "email", label: "Email", minWidth: 200 },
    { id: "mobileNumber", label: "Mobile", minWidth: 150 },
    {
      id: "status",
      label: "Status",
      minWidth: 100,
      format: (value: string) => (
        <span style={{ color: value === "ACTIVE" ? "green" : "red" }}>{value || "ACTIVE"}</span>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Student Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          sx={{ backgroundColor: "primary.main" }}
        >
          Add Student
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search students by name, email, or mobile..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <DataTable
        columns={columns}
        rows={filteredStudents}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        loading={status === "loading"}
      />

      {openDialog && (
        <StudentFormDialog
          open={openDialog}
          onClose={handleCloseDialog}
          student={editingStudent}
          onSuccess={handleSubmitSuccess}
        />
      )}
    </Box>
  );
};

export default StudentsPage;

