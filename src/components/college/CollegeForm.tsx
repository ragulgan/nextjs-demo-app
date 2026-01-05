import React, { forwardRef, useImperativeHandle } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Box, TextField, FormControl, FormHelperText, InputLabel, Select, MenuItem } from "@mui/material";
import { collegeAddMethod } from "@/redux/slices/college/collegeAddSlice";
import { collegeUpdateMethod } from "@/redux/slices/college/collegeUpdateSlice";
import { useSnackbar } from "@/components/common/snackbar";
import { AppDispatch } from "@/redux/stote";

interface CollegeFormProps {
  college?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export interface CollegeFormHandle {
  submit: () => void;
}

type FormValues = {
  collegeName: string;
  code?: number;
  address?: string;
  email?: string;
  phone?: string;
  website?: string;
  established?: string;
  status: string;
};

const CollegeForm = forwardRef<CollegeFormHandle, CollegeFormProps>(({ college, onSuccess, onCancel }, ref) => {
  const dispatch = useDispatch<AppDispatch>();
  const { enqueueSnackbar } = useSnackbar();

  const defaultFormValues: FormValues = {
    collegeName: college?.collegeName || "",
    code: college?.code || undefined,
    address: college?.address || "",
    email: college?.email || "",
    phone: college?.phone || "",
    website: college?.website || "",
    established: college?.established || "",
    status: college?.status || "ACTIVE",
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({ defaultValues: defaultFormValues });

  React.useEffect(() => {
    if (reset) reset(defaultFormValues);
  }, [college]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      if (college?.id) {
        await (dispatch as any)(collegeUpdateMethod({ id: college.id, data })).unwrap();
        enqueueSnackbar("College updated successfully", "success");
      } else {
        await (dispatch as any)(collegeAddMethod(data)).unwrap();
        enqueueSnackbar("College created successfully", "success");
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
          <TextField label="College Name" fullWidth error={!!errors.collegeName} {...register("collegeName", { required: "College name is required" })} />
          <FormHelperText sx={{ color: "error.main" }}>{errors.collegeName?.message}</FormHelperText>
        </FormControl>

        <FormControl fullWidth>
          <TextField label="Code" type="number" fullWidth {...register("code", { valueAsNumber: true })} />
        </FormControl>

        <FormControl fullWidth>
          <TextField label="Address" fullWidth multiline rows={3} {...register("address")} />
        </FormControl>

        <FormControl fullWidth>
          <TextField label="Email" fullWidth type="email" {...register("email")} />
        </FormControl>

        <FormControl fullWidth>
          <TextField label="Phone" fullWidth {...register("phone")} />
        </FormControl>

        <FormControl fullWidth>
          <TextField label="Website" fullWidth {...register("website")} />
        </FormControl>

        <FormControl fullWidth>
          <TextField label="Established" fullWidth {...register("established")} />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select label="Status" defaultValue={college?.status || "ACTIVE"} {...register("status") }>
            <MenuItem value="ACTIVE">Active</MenuItem>
            <MenuItem value="INACTIVE">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </form>
  );
});

CollegeForm.displayName = "CollegeForm";

export default CollegeForm;
