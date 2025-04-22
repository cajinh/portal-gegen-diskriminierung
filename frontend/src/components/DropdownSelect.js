import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function DropdownSelect({ label, value, onChange, options }) {
  return (
    <FormControl fullWidth size="small">
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
    </FormControl>
  );
}

export default DropdownSelect;
