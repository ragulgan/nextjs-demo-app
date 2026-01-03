import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import InfoIcon from "@mui/icons-material/Info";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import AssignmentIcon from "@mui/icons-material/Assignment";

const drawerWidth = 240;

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

interface MenuItem {
  text: string;
  icon: React.ComponentType<any>;
  path: string;
  gif?: any;
  visible?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onToggle }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [indexValue, setIndexValue] = useState<number | null>(null);

  const menuItems: MenuItem[] = [
    {
      text: "Home",
      icon: HomeIcon,
      path: "/home",
      visible: true,
    },
    {
      text: "Colleges",
      icon: PeopleIcon,
      path: "/colleges",
      visible: true,
    },
    {
      text: "Students",
      icon: PeopleIcon,
      path: "/students",
      visible: true,
    },
    {
      text: "Courses",
      icon: MenuBookIcon,
      path: "/courses",
      visible: true,
    },
    {
      text: "Faculty",
      icon: PersonIcon,
      path: "/faculty",
      visible: true,
    },
    {
      text: "Departments",
      icon: BusinessIcon,
      path: "/departments",
      visible: true,
    },
    {
      text: "Enrollments",
      icon: AssignmentIcon,
      path: "/enrollments",
      visible: true,
    },
    {
      text: "About",
      icon: InfoIcon,
      path: "/about",
      visible: true,
    },
  ];

  const handleMobileClose = () => {
    // Close sidebar on mobile after navigation
    if (typeof window !== "undefined" && window.innerWidth < 960) {
      onToggle();
    }
  };

  const handleMenuItem = (event: React.MouseEvent, item: MenuItem) => {
    event.preventDefault();
    router.push(item.path);
    handleMobileClose();
  };

  return (
    <Drawer
      open={open}
      onClose={onToggle}
      variant="persistent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      {/* College Logo Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <SchoolIcon sx={{ fontSize: 48, color: "primary.main", mb: 1 }} />
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "primary.main" }}>
          College App
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Education Excellence
        </Typography>
      </Box>

      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems
            .filter((item) => !!item.visible)
            .map((item, index) => {
              const isActive = router.pathname === item.path;
              const IconComponent = item.icon;
              
              return (
                <ListItem
                  key={index}
                  onClick={(event) => handleMenuItem(event, item)}
                  sx={{
                    justifyContent: "center",
                    flexDirection: "column",
                    cursor: "pointer",
                    px: 0.5,
                    borderTop: item.text === "About" ? "1px solid #D1D1D1" : "0",
                  }}
                  component="div"
                >
                  <ListItemIcon
                    onMouseEnter={() => {
                      setIsHovered(true);
                      setIndexValue(index);
                    }}
                    onMouseLeave={() => {
                      setIsHovered(false);
                      setIndexValue(null);
                    }}
                    sx={{
                      minWidth: "unset",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "46px",
                      height: "46px",
                      borderRadius: "4px",
                      mt: item.text === "About" ? 1 : 0,
                      color: isActive ? "#fff" : "#008755",
                      background: isActive
                        ? "#008755"
                        : "rgba(177, 228, 227, 0.20)",
                      border: isActive
                        ? "1px solid #21865B"
                        : "1px solid #fff",
                      "&:hover": {
                        borderColor: "#008755",
                        background: isActive
                          ? "#008755"
                          : "rgba(177, 228, 227, 0.20)",
                      },
                    }}
                  >
                    {isHovered &&
                    index === indexValue &&
                    !isActive &&
                    item.gif ? (
                      <img
                        src={item.gif?.src}
                        alt="Hover GIF"
                        style={{ width: "90%", height: "90%" }}
                        loading="lazy"
                      />
                    ) : (
                      <IconComponent sx={{ width: 30, height: 30 }} />
                    )}
                  </ListItemIcon>
                  <Typography
                    sx={{
                      mt: 1,
                      color: isActive ? "#008755" : "#58585B",
                      textAlign: "center",
                      fontSize: "0.875rem",
                      "&:hover": {
                        color: "#008755",
                      },
                    }}
                  >
                    {item.text}
                  </Typography>
                </ListItem>
              );
            })}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
