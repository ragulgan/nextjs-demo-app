"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Button, Paper, TextField, InputAdornment } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "@/components/common/DataTable";
import CollegeFormDialog from "@/components/college/CollegeFormDialog";
import CollegeViewDialog from "@/components/college/CollegeViewDialog";
import { fetchUserList } from "@/redux/slices/college/collegeListSlice";
import { deleteCollegeMethod } from "@/redux/slices/college/collegeDeleteSlice";
import { AppDispatch } from "@/redux/stote";
import { useSnackbar } from "@/components/common/snackbar";

const CollegesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { enqueueSnackbar } = useSnackbar();
  const { users, loading } = useSelector((state: any) => state.collegeList);
  console.log("Colleges state:", users);
  const [openDialog, setOpenDialog] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [editingCollege, setEditingCollege] = useState<any>(null);
  const [viewCollege, setViewCollege] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchUserList({}));
  }, [dispatch]);

  const handleAdd = () => {
    setEditingCollege(null);
    setOpenDialog(true);
  };

  const handleEdit = (college: any) => {
    setEditingCollege(college);
    setOpenDialog(true);
  };

  const handleDelete = async (college: any) => {
    if (window.confirm(`Are you sure you want to delete ${college.collegeName}?`)) {
      try {
        await dispatch(deleteCollegeMethod(college.id)).unwrap();
        enqueueSnackbar("College deleted successfully", "success");
        dispatch(fetchUserList({}));
      } catch (error: any) {
        enqueueSnackbar(error?.message || "Failed to delete college", "error");
      }
    }
  };

  const handleView = (college: any) => {
    setViewCollege(college);
    setOpenView(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingCollege(null);
  };

  const handleSubmitSuccess = () => {
    handleCloseDialog();
    dispatch(fetchUserList({}));
  };
console.log("users:", users);
  const collegesArray = Array.isArray(users) ? users : [];
  console.log("Colleges Array:", collegesArray);

  const filtered = collegesArray.filter((c: any) => {
    const s = searchTerm.toLowerCase();
    return (
      c.collegeName?.toLowerCase().includes(s) ||
      String(c.code || "").includes(searchTerm) ||
      c.email?.toLowerCase().includes(s) ||
      c.phone?.includes(searchTerm)
    );
  });

  const columns = [
    { id: "collegeName", label: "College Name", minWidth: 200 },
    { id: "code", label: "Code", minWidth: 80 },
    { id: "email", label: "Email", minWidth: 180 },
    { id: "phone", label: "Phone", minWidth: 140 },
    { id: "status", label: "Status", minWidth: 100, format: (v: string) => <span style={{ color: v === "ACTIVE" ? "green" : "red" }}>{v}</span> },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>College Management</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>Add College</Button>
      </Box>

      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField fullWidth variant="outlined" placeholder="Search colleges by name, code, email or phone..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }} />
      </Paper>

      <DataTable columns={columns} rows={filtered} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} loading={loading} />

      {openDialog && (
        <CollegeFormDialog open={openDialog} onClose={handleCloseDialog} college={editingCollege} onSuccess={handleSubmitSuccess} />
      )}

      {openView && (
        <CollegeViewDialog open={openView} onClose={() => setOpenView(false)} college={viewCollege} />
      )}
    </Box>
  );
};

export default CollegesPage;
