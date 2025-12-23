import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";

interface HeaderAppBarProps {
  onMenuClick: () => void;
}

const HeaderAppBar: React.FC<HeaderAppBarProps> = ({ onMenuClick }) => {
  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          College App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderAppBar;
