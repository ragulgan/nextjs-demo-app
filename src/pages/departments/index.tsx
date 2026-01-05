"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Paper, Button, TextField, InputAdornment } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BusinessIcon from "@mui/icons-material/Business";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "@/components/common/DataTable";
import DepartmentFormDialog from "@/components/department/DepartmentFormDialog";
import DepartmentViewDialog from "@/components/department/DepartmentViewDialog";
import { fetchDepartmentList } from "@/redux/slices/department/departmentListSlice";
import { deleteDepartmentMethod } from "@/redux/slices/department/departmentDeleteSlice";
import { AppDispatch } from "@/redux/stote";
import { useSnackbar } from "@/components/common/snackbar";

const DepartmentsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
    const { enqueueSnackbar } = useSnackbar();
    const { users, loading } = useSelector((state: any) => state.departmentList);
    console.log("Departments from store:", users);
    const [openDialog, setOpenDialog] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [editingDepartment, setEditingDepartment] = useState<any>(null);
    const [viewDepartment, setViewDepartment] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState("");
  
    useEffect(() => {
      dispatch(fetchDepartmentList({}));
    }, [dispatch]);
  
    const handleAdd = () => {
      setEditingDepartment(null);
      setOpenDialog(true);
    };
  
    const handleEdit = (department: any) => {
      setEditingDepartment(department);
      setOpenDialog(true);
    };
  
    const handleDelete = async (department: any) => {
      if (window.confirm(`Are you sure you want to delete ${department.departmentName}?`)) {
        try {
          await dispatch(deleteDepartmentMethod(department.id)).unwrap();
          enqueueSnackbar("Department deleted successfully", "success");
          dispatch(fetchDepartmentList({}));
        } catch (error: any) {
          enqueueSnackbar(error?.message || "Failed to delete department", "error");
        }
      }
    };
  
    const handleView = (department: any) => {
      setViewDepartment(department);
      setOpenView(true);
    };
  
    const handleCloseDialog = () => {
      setOpenDialog(false);
      setEditingDepartment(null);
    };
  
    const handleSubmitSuccess = () => {
      handleCloseDialog();
      dispatch(fetchDepartmentList({}));
    };
  
    const departmentsArray = Array.isArray(users) ? users : [];
  
  
    const filtered = departmentsArray.filter((c: any) => {
      const s = searchTerm.toLowerCase();
      return (
        c.departmentName?.toLowerCase().includes(s) ||
        c.abbreviation?.toLowerCase().includes(s) ||
        c.shortDescription?.toLowerCase().includes(s) ||
        c.collegeId?.collegeName?.toLowerCase().includes(s)
      );
    });
  
    const columns = [
      { id: "departmentName", label: "Department Name", minWidth: 80 },
      { id: "abbreviation", label: "Abbreviation", minWidth: 200 },
      { id: "shortDescription", label: "Description", minWidth: 180 },
      { id: "collegeId.collegeName", label: "College", minWidth: 140 },
      { id: "status", label: "Status", minWidth: 100, format: (v: string) => <span style={{ color: v === "ACTIVE" ? "green" : "red" }}>{v}</span> },
    ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <BusinessIcon sx={{ fontSize: 40, color: "primary.main" }} />
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Department Management
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          Add Department
        </Button>
      </Box>

      {/* <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          Department management module coming soon
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          This module will allow you to manage departments, their details, and organizational structure.
        </Typography>
      </Paper> */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField fullWidth variant="outlined" placeholder="Search colleges by name, code, email or phone..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }} />
      </Paper>

      <DataTable columns={columns} rows={filtered} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} loading={loading} />

      {openDialog && (
        <DepartmentFormDialog open={openDialog} onClose={handleCloseDialog} department={editingDepartment} onSuccess={handleSubmitSuccess} />
      )}

      {openView && (
        <DepartmentViewDialog open={openView} onClose={() => setOpenView(false)} department={viewDepartment} />
      )}
    </Box>
  );
};

export default DepartmentsPage;

