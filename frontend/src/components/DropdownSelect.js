import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';

function DropdownSelect({ label, value, onChange, options, required = false }) {
  const isError = required && !value;

  return (
    <FormControl fullWidth size="small" required={required} error={isError}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {isError && (
        <FormHelperText>Bitte wählen Sie eine Kategorie aus</FormHelperText>
      )}
    </FormControl>
  );
}

export default DropdownSelect;
