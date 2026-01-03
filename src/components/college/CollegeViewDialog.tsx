import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography } from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  college?: any;
}

const CollegeViewDialog: React.FC<Props> = ({ open, onClose, college }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>College Details</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="h6">{college?.collegeName}</Typography>
          <Box sx={{ display: "flex", gap: 2 }}><Typography><strong>Code:</strong></Typography><Typography>{college?.code}</Typography></Box>
          <Box sx={{ display: "flex", gap: 2 }}><Typography><strong>Status:</strong></Typography><Typography>{college?.status}</Typography></Box>
          <Box><Typography><strong>Address:</strong> {college?.address}</Typography></Box>
          <Box sx={{ display: "flex", gap: 2 }}><Typography><strong>Email:</strong></Typography><Typography>{college?.email}</Typography></Box>
          <Box sx={{ display: "flex", gap: 2 }}><Typography><strong>Phone:</strong></Typography><Typography>{college?.phone}</Typography></Box>
          <Box><Typography><strong>Website:</strong> {college?.website}</Typography></Box>
          <Box sx={{ display: "flex", gap: 2 }}><Typography><strong>Established:</strong></Typography><Typography>{college?.established}</Typography></Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CollegeViewDialog;
