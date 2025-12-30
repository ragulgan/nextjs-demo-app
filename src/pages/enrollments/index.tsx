import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AssignmentIcon from "@mui/icons-material/Assignment";

const EnrollmentsPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <AssignmentIcon sx={{ fontSize: 40, color: "primary.main" }} />
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Enrollment Management
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />}>
          New Enrollment
        </Button>
      </Box>

      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          Enrollment management module coming soon
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          This module will allow you to manage student enrollments in courses.
        </Typography>
      </Paper>
    </Box>
  );
};

export default EnrollmentsPage;

