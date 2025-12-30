import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  FormControl,
  FormHelperText,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
  useTheme,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { login } from "@/redux/slices/authSlice";
import { login_User } from "@/redux/slices/authUserSlice";
import { useSnackbar } from "@/components/Common/snackbar";
import { regexPattern, errorMessage } from "@/utils/regex";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const [hide, setHide] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const passwordShown = () => setHide((prev) => !prev);

  const onSubmitAdmin: SubmitHandler<FormValues> = async (data: FormValues) => {
    const result = await dispatch(login(data) as any);
    if (login.fulfilled.match(result)) {
      const payload = result.payload as any;
      const message = payload?.message || "Login successful";
      enqueueSnackbar(message, "success");
      router.push("/dashboard");
    } else {
      const payload = result.payload as any;
      const errorMessage = payload?.message || payload?.msg || "Login failed. Please try again.";
      enqueueSnackbar(errorMessage, "error");
    }
  };

  const onSubmitUser: SubmitHandler<FormValues> = async (data: FormValues) => {
    const result = await dispatch(login_User(data) as any);
    if (login_User.fulfilled.match(result)) {
      const payload = result.payload as any;
      const message = payload?.message || "Login successful";
      enqueueSnackbar(message, "success");
      router.push("/dashboard");
    } else {
      const payload = result.payload as any;
      const errorMessage = payload?.message || payload?.msg || "Login failed. Please try again.";
      enqueueSnackbar(errorMessage, "error");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        px: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, width: "100%", maxWidth: 480 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom align="center" sx={{ color: theme.palette.primary.main }}>
          Login
        </Typography>

        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          centered 
          sx={{ mb: 3 }}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Admin Login" />
          <Tab label="User Login" />
        </Tabs>

        {activeTab === 0 && (
          <Box component="form" onSubmit={handleSubmit(onSubmitAdmin)}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                error={!!errors.email}
                {...register("email", {
                  required: errorMessage.Email_Required,
                  pattern: {
                    value: regexPattern.email,
                    message: errorMessage.Invalid_Email,
                  },
                })}
              />
              <FormHelperText sx={{ minHeight: "20px", color: "error.main" }}>
                {errors.email?.message}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                label="Password"
                type={hide ? "password" : "text"}
                fullWidth
                margin="normal"
                error={!!errors.password}
                {...register("password", {
                  required: errorMessage.Password_Required,
                  pattern: {
                    value: regexPattern.password,
                    message: errorMessage.Password_Criteria,
                  },
                })}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={passwordShown} edge="end">
                          {hide ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <FormHelperText sx={{ minHeight: "20px", color: "error.main" }}>
                {errors.password?.message}
              </FormHelperText>
            </FormControl>
            <Box textAlign="center">
              <Button 
                type="submit" 
                variant="contained" 
                sx={{ 
                  mt: 2, 
                  mx: "auto", 
                  display: "block", 
                  width: 200,
                  backgroundColor: theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                  }
                }}
              >
                Admin Login
              </Button>
            </Box>
          </Box>
        )}

        {activeTab === 1 && (
          <Box component="form" onSubmit={handleSubmit(onSubmitUser)}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                error={!!errors.email}
                {...register("email", {
                  required: errorMessage.Email_Required,
                  pattern: {
                    value: regexPattern.email,
                    message: errorMessage.Invalid_Email,
                  },
                })}
              />
              <FormHelperText sx={{ minHeight: "20px", color: "error.main" }}>
                {errors.email?.message}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                label="Password"
                type={hide ? "password" : "text"}
                fullWidth
                margin="normal"
                error={!!errors.password}
                {...register("password", {
                  required: errorMessage.Password_Required,
                  pattern: {
                    value: regexPattern.password,
                    message: errorMessage.Password_Criteria,
                  },
                })}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={passwordShown} edge="end">
                          {hide ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <FormHelperText sx={{ minHeight: "20px", color: "error.main" }}>
                {errors.password?.message}
              </FormHelperText>
            </FormControl>
            <Box textAlign="center">
              <Button 
                type="submit" 
                variant="contained" 
                sx={{ 
                  mt: 2, 
                  mx: "auto", 
                  display: "block", 
                  width: 200,
                  backgroundColor: theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                  }
                }}
              >
                User Login
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default LoginPage;


