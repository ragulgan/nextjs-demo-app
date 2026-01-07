import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Skeleton,
} from "@mui/material";
import { Controller, Control } from "react-hook-form";

interface RHFSelectProps {
  name: string;
  label: string;
  control: Control<any>;
  options: any[];
  optionLabel: string;
  optionValue: string;
  loading?: boolean;
  rules?: any;
}

const CustomSelect = ({
  name,
  label,
  control,
  options,
  optionLabel,
  optionValue,
  loading = false,
  rules,
}: RHFSelectProps) => {
  if (loading) {
    return <Skeleton variant="rectangular" height={56} />;
  }

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <Select {...field} label={label} error={!!fieldState.error}>
              {options.map((item) => (
                <MenuItem key={item[optionValue]} value={item[optionValue]}>
                  {item[optionLabel]}
                </MenuItem>
              ))}
            </Select>

            {fieldState.error && (
              <FormHelperText sx={{ color: "error.main" }}>
                {fieldState.error.message}
              </FormHelperText>
            )}
          </>
        )}
      />
    </FormControl>
  );
};

export default CustomSelect;
