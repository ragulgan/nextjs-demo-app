import React, { forwardRef, useImperativeHandle } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  TextField,
  Grid,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { createStudent, updateStudent } from "@/redux/slices/studentSlice";
import { useSnackbar } from "@/components/common/snackbar";
import { regexPattern, errorMessage } from "@/utils/regex";
import { AppDispatch } from "@/redux/stote";

interface StudentFormProps {
  student?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export interface StudentFormHandle {
  submit: () => void;
}

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  dateOfBirth?: string;
  address?: string;
  status: string;
  departmentId?: string;
};

const StudentForm = forwardRef<StudentFormHandle, StudentFormProps>(
  ({ student, onSuccess, onCancel }, ref) => {
    const dispatch = useDispatch<AppDispatch>();
    const { enqueueSnackbar } = useSnackbar();
    const defaultFormValues: FormValues = {
      firstName: student?.firstName || "",
      lastName: student?.lastName || "",
      email: student?.email || "",
      mobileNumber: student?.mobileNumber || "",
      dateOfBirth: student?.dateOfBirth || "",
      address: student?.address || "",
      status: student?.status || "ACTIVE",
      departmentId: student?.departmentId || "",
    };

    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm<FormValues>({
      defaultValues: defaultFormValues,
    });

    React.useEffect(() => {
      if (reset) {
        reset(defaultFormValues);
      }
    }, [student]);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
      try {
        if (student?.id) {
          await dispatch(updateStudent({ id: student.id, data })).unwrap();
          enqueueSnackbar("Student updated successfully", "success");
        } else {
          await dispatch(createStudent(data)).unwrap();
          enqueueSnackbar("Student created successfully", "success");
        }
        onSuccess();
      } catch (error: any) {
        enqueueSnackbar(error?.msg || "Failed to save student", "error");
      }
    };

    useImperativeHandle(ref, () => ({
      submit: () => {
        handleSubmit(onSubmit)();
      },
    }));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="First Name"
              fullWidth
              error={!!errors.firstName}
              {...register("firstName", { required: "First name is required" })}
            />
            <FormHelperText sx={{ color: "error.main" }}>
              {errors.firstName?.message}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="Last Name"
              fullWidth
              error={!!errors.lastName}
              {...register("lastName", { required: "Last name is required" })}
            />
            <FormHelperText sx={{ color: "error.main" }}>
              {errors.lastName?.message}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="Email"
              fullWidth
              type="email"
              error={!!errors.email}
              {...register("email", {
                required: errorMessage.Email_Required,
                pattern: {
                  value: regexPattern.email,
                  message: errorMessage.Invalid_Email,
                },
              })}
            />
            <FormHelperText sx={{ color: "error.main" }}>
              {errors.email?.message}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="Mobile Number"
              fullWidth
              error={!!errors.mobileNumber}
              {...register("mobileNumber", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit mobile number",
                },
              })}
            />
            <FormHelperText sx={{ color: "error.main" }}>
              {errors.mobileNumber?.message}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="Date of Birth"
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
              {...register("dateOfBirth")}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              defaultValue={student?.status || "ACTIVE"}
              {...register("status")}
            >
              <MenuItem value="ACTIVE">Active</MenuItem>
              <MenuItem value="INACTIVE">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Address"
              fullWidth
              multiline
              rows={3}
              {...register("address")}
            />
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
  }
);

StudentForm.displayName = "StudentForm";

export default StudentForm;

