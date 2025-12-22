import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import InfoIcon from "@mui/icons-material/Info";

const drawerWidth = 240;

const Sidebar: React.FC = () => {
  const items = [
    { text: "Home", icon: <HomeIcon /> },
    { text: "Courses", icon: <MenuBookIcon /> },
    { text: "About", icon: <InfoIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {items.map((it) => (
            <ListItem key={it.text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{it.icon}</ListItemIcon>
                <ListItemText primary={it.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
