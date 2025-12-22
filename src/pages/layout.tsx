"use client"; // Client-side layout

import React, { ReactNode } from "react";
import { CssBaseline, Box } from "@mui/material";
import Providers from "@/redux/Providers";
import { ThemeProvider } from "@mui/material/styles";
import theme from '@/theme';
import { Sidebar, HeaderAppBar, Footer } from "@/components";
import { useDispatch, useSelector } from "react-redux";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <Providers>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            maxWidth: "100vw",
          }}
        >
          <Sidebar />
          <Box sx={{ flexGrow: 1 }}>
            <HeaderAppBar />
            <main className="bg-workspace">{children}</main>
            <Footer />
          </Box>
        </Box>
      </ThemeProvider>
    </Providers>
  );
};

export default RootLayout;
