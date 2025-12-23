import React, { createContext, useCallback, useContext, useState } from "react";
import { Snackbar, Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Variant = "success" | "error" | "info" | "warning";

interface SnackbarContextValue {
  enqueueSnackbar: (message: string, type?: Variant) => void;
}

interface SnackbarProviderProps {
  children: React.ReactNode;
}

const SnackbarContext = createContext<SnackbarContextValue | undefined>(undefined);

export const useSnackbar = (): SnackbarContextValue => {
  const ctx = useContext(SnackbarContext);
  if (!ctx) {
    throw new Error("useSnackbar must be used within SnackbarProvider");
  }
  return ctx;
};

const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [snack, setSnack] = useState<{ open: boolean; message: string; type: Variant }>({
    open: false,
    message: "",
    type: "info",
  });

  const enqueueSnackbar = useCallback((message: string, type: Variant = "info") => {
    setSnack({ open: true, message, type });
  }, []);

  const handleClose = () => {
    setSnack((prev) => ({ ...prev, open: false }));
  };

  return (
    <SnackbarContext.Provider value={{ enqueueSnackbar }}>
      {children}
      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={snack.type}
          variant="filled"
          action={
            <IconButton size="small" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
          sx={{
            width: "100%",
            bgcolor: {
              success: "#4caf50",
              error: "#f44336",
              warning: "#ff9800",
              info: "#2196f3",
            }[snack.type],
          }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;


