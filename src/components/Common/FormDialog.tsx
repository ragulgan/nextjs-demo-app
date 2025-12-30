import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";

interface FormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  children: React.ReactNode;
  submitLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
}

const FormDialog: React.FC<FormDialogProps> = ({
  open,
  onClose,
  onSubmit,
  title,
  children,
  submitLabel = "Save",
  cancelLabel = "Cancel",
  loading = false,
  maxWidth = "md",
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>{children}</Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          {cancelLabel}
        </Button>
        <Button onClick={onSubmit} variant="contained" disabled={loading}>
          {loading ? "Saving..." : submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;

