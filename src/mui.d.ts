"use client";
import { CSSProperties } from "react";
import "@mui/material/styles";
import "@mui/material/Typography";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    titleStyle: CSSProperties;
  }

  interface TypographyVariantsOptions {
    titleStyle?: CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    titleStyle: true;
  }
}


