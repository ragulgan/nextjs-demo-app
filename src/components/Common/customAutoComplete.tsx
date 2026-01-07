import {
  Autocomplete,
  TextField,
  CircularProgress,
} from "@mui/material";
import { Controller, Control } from "react-hook-form";

interface RHFAutocompleteProps {
  name: string;
  label: string;
  control: Control<any>;
  options: any[];
  optionLabel: string;
  optionValue: string;
  loading?: boolean;
  rules?: any;
}

const CustomAutocompleteProps = ({
  name,
  label,
  control,
  options,
  optionLabel,
  optionValue,
  loading = false,
  rules,
}: RHFAutocompleteProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <Autocomplete
          options={options}
          loading={loading}
          getOptionLabel={(option) => option?.[optionLabel] || ""}
          isOptionEqualToValue={(option, value) =>
            option?.[optionValue] === value
          }
          value={
            options.find(
              (opt) => opt[optionValue] === field.value
            ) || null
          }
          onChange={(_, newValue) =>
            field.onChange(newValue ? newValue[optionValue] : "")
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading && (
                      <CircularProgress color="inherit" size={20} />
                    )}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      )}
    />
  );
};

export default CustomAutocompleteProps;
