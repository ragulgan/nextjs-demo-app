import React, { useRef } from "react";
import FormDialog from "@/components/common/FormDialog";
import DepartmentForm from "./DepartmentForm";

interface Props {
  open: boolean;
  onClose: () => void;
  department?: any;
  onSuccess: () => void;
}

const DepartmentFormDialog: React.FC<Props> = ({ open, onClose, department, onSuccess }) => {
  const formRef = useRef<{ submit: () => void }>(null);

  const handleSubmit = () => {
    if (formRef.current) formRef.current.submit();
  };

  return (
    <FormDialog open={open} onClose={onClose} onSubmit={handleSubmit} title={department ? "Edit Department" : "Add New Department"} maxWidth="md">
      <DepartmentForm ref={formRef} department={department} onSuccess={onSuccess} onCancel={onClose} />
    </FormDialog>
  );
};

export default DepartmentFormDialog;
