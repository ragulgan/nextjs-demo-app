import React, { useRef } from "react";
import FormDialog from "@/components/Common/FormDialog";
import StudentForm from "./StudentForm";

interface StudentFormDialogProps {
  open: boolean;
  onClose: () => void;
  student?: any;
  onSuccess: () => void;
}

const StudentFormDialog: React.FC<StudentFormDialogProps> = ({
  open,
  onClose,
  student,
  onSuccess,
}) => {
  const formRef = useRef<{ submit: () => void }>(null);

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  return (
    <FormDialog
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={student ? "Edit Student" : "Add New Student"}
      maxWidth="md"
    >
      <StudentForm
        ref={formRef}
        student={student}
        onSuccess={onSuccess}
        onCancel={onClose}
      />
    </FormDialog>
  );
};

export default StudentFormDialog;

