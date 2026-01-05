import React, { forwardRef, useImperativeHandle } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Box, TextField, FormControl, FormHelperText, InputLabel, Select, MenuItem } from "@mui/material";
import { departmentAddMethod } from "@/redux/slices/department/departmentAddSlice";
import { departmentUpdateMethod } from "@/redux/slices/department/departmentUpdateSlice";
import { fetchCollegeList } from "@/redux/slices/college/collegeListSlice";
import { useSnackbar } from "@/components/common/snackbar";
import { AppDispatch } from "@/redux/stote";

interface DepartmentFormProps {
  department?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export interface CollegeFormHandle {
  submit: () => void;
}

type FormValues = {
  departmentName: string;
  abbreviation?: string;
  shortDescription?: string;
  status: string;
  collegeId?: string;
};

const DepartmentForm = forwardRef<CollegeFormHandle, DepartmentFormProps>(({ department, onSuccess, onCancel }, ref) => {
  const dispatch = useDispatch<AppDispatch>();
  const { enqueueSnackbar } = useSnackbar();

  const defaultFormValues: FormValues = {
    departmentName: department?.departmentName || "",
    abbreviation: department?.abbreviation || "",
    shortDescription: department?.shortDescription || "",
    collegeId: department?.collegeId ? department?.collegeId?.id : "6958eb927977d8e25b9f51f7",
    status: department?.status || "ACTIVE",
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({ defaultValues: defaultFormValues });

  React.useEffect(() => {
    if (reset) reset(defaultFormValues);
  }, [department]);

  React.useEffect(() => {
    dispatch(fetchCollegeList({}));
  }, [dispatch]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      if (department?.id) {
        await (dispatch as any)(departmentUpdateMethod({ id: department.id, data })).unwrap();
        enqueueSnackbar("Department updated successfully", "success");
      } else {
        await (dispatch as any)(departmentAddMethod(data)).unwrap();
        enqueueSnackbar("Department created successfully", "success");
      }
      onSuccess();
    } catch (error: any) {
      enqueueSnackbar(error?.message || "Failed to save college", "error");
    }
  };

  useImperativeHandle(ref, () => ({
    submit: () => {
      handleSubmit(onSubmit)();
    },
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControl fullWidth>
          <TextField label="Department Name" fullWidth error={!!errors.departmentName} {...register("departmentName", { required: "Department name is required" })} />
          <FormHelperText sx={{ color: "error.main" }}>{errors.departmentName?.message}</FormHelperText>
        </FormControl>

        <FormControl fullWidth>
          <TextField label="Abbreviation" fullWidth {...register("abbreviation", { required: "Abbreviation is required" })} />
        </FormControl>

        <FormControl fullWidth>
          <TextField label="Short Description" fullWidth multiline rows={2} {...register("shortDescription", { required: "Short Description is required" })} />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select label="Status" defaultValue={department?.status || "ACTIVE"} {...register("status") }>
            <MenuItem value="ACTIVE">Active</MenuItem>
            <MenuItem value="INACTIVE">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </form>
  );
});

DepartmentForm.displayName = "DepartmentForm";

export default DepartmentForm;
