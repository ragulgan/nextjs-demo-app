import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ py: 2, px: 3, mt: 4, borderTop: 1, borderColor: "divider" }}>
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} College App
      </Typography>
    </Box>
  );
};

export default Footer;
