import React, { useRef } from "react";
import FormDialog from "@/components/common/FormDialog";
import CollegeForm from "./CollegeForm";

interface Props {
  open: boolean;
  onClose: () => void;
  college?: any;
  onSuccess: () => void;
}

const CollegeFormDialog: React.FC<Props> = ({ open, onClose, college, onSuccess }) => {
  const formRef = useRef<{ submit: () => void }>(null);

  const handleSubmit = () => {
    if (formRef.current) formRef.current.submit();
  };

  return (
    <FormDialog open={open} onClose={onClose} onSubmit={handleSubmit} title={college ? "Edit College" : "Add New College"} maxWidth="md">
      <CollegeForm ref={formRef} college={college} onSuccess={onSuccess} onCancel={onClose} />
    </FormDialog>
  );
};

export default CollegeFormDialog;
