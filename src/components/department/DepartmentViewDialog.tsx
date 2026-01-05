import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography } from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  department?: any;
}

const DepartmentViewDialog: React.FC<Props> = ({ open, onClose, department }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Department Details</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="h6">{department?.departmentName}</Typography>
          <Box sx={{ display: "flex", gap: 2 }}><Typography><strong>Abbreviation:</strong></Typography><Typography>{department?.abbreviation}</Typography></Box>
          <Box sx={{ display: "flex", gap: 2 }}><Typography><strong>Status:</strong></Typography><Typography>{department?.status}</Typography></Box>
          <Box><Typography><strong>Short Description:</strong> {department?.shortDescription}</Typography></Box>
          <Box sx={{ display: "flex", gap: 2 }}><Typography><strong>College:</strong></Typography><Typography>{department?.collegeId?.collegeName}</Typography></Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DepartmentViewDialog;
