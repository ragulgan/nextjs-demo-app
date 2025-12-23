"use client"; // Client-side layout

import React, { ReactNode, useState } from "react";
import { CssBaseline, Box } from "@mui/material";
import Providers from "@/redux/Providers";
import { ThemeProvider } from "@mui/material/styles";
import theme from '@/theme';
import { Sidebar, HeaderAppBar, Footer } from "@/components";
import { useDispatch, useSelector } from "react-redux";

const drawerWidth = 240;

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  const [drawerOpen, setDrawerOpen] = useState(true);

  const handleToggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <Providers>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box>
          <Sidebar open={drawerOpen} onToggle={handleToggleDrawer} />
          <Box
            sx={{
              flexGrow: 1,
              ml: drawerOpen ? `${drawerWidth}px` : 0,
              transition: "margin-left 225ms ease-out",
            }}
          >
            <HeaderAppBar onMenuClick={handleToggleDrawer} />
            <main className="bg-workspace">{children}</main>
            <Footer />
          </Box>
        </Box>
      </ThemeProvider>
    </Providers>
  );
};

export default RootLayout;
