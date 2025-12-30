import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";

const FacultyPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <PersonIcon sx={{ fontSize: 40, color: "primary.main" }} />
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Faculty Management
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add Faculty
        </Button>
      </Box>

      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          Faculty management module coming soon
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          This module will allow you to manage faculty members, their details, and assignments.
        </Typography>
      </Paper>
    </Box>
  );
};

export default FacultyPage;

