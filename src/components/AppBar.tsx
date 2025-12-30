import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logout as logoutAdmin } from "@/redux/slices/authSlice";
import { logout as logoutUser } from "@/redux/slices/authUserSlice";

interface HeaderAppBarProps {
  onMenuClick: () => void;
}

const HeaderAppBar: React.FC<HeaderAppBarProps> = ({ onMenuClick }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Clear both admin and user tokens
    dispatch(logoutAdmin());
    dispatch(logoutUser());
    
    // Clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("adminInfo");
      localStorage.removeItem("userInfo");
    }
    
    handleMenuClose();
    router.push("/login");
  };

  const isMenuOpen = Boolean(anchorEl);

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
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls="profile-menu"
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderAppBar;
