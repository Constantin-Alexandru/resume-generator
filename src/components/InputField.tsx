import { Theme } from '@emotion/react';
import { SxProps, TextField } from '@mui/material';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  sx?: SxProps<Theme>;
  error?: boolean;
  errorText?: string;
}

export default function InputField(props: InputFieldProps) {
  const {
    label,
    value,
    onChange,
    required,
    multiline,
    rows,
    error,
    errorText,
    sx,
  } = props;

  return (
    <TextField
      label={label}
      value={value}
      variant="standard"
      onChange={(event) => onChange(event.target.value)}
      required={required ?? false}
      multiline={multiline ?? false}
      rows={rows ?? 4}
      error={error ?? false}
      helperText={error && errorText}
      sx={sx}
    />
  );
}
