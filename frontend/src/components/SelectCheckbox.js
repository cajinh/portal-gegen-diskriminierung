import React from 'react';
import { FormGroup, FormControlLabel, Checkbox, Box } from '@mui/material';
import { categories } from '../constants/categories';

function SelectCheckbox({ selectedOptions, setSelectedOptions }) {
  const handleChange = (index) => (event) => {
    const updated = [...selectedOptions];
    if (event.target.checked) {
      updated.push(index);
    } else {
      const i = updated.indexOf(index);
      if (i > -1) updated.splice(i, 1);
    }
    setSelectedOptions(updated);
  };

  const half = Math.ceil(categories.length / 2);
  const leftColumn = categories.slice(0, half);
  const rightColumn = categories.slice(half);

  return (
    <Box display="flex" gap={4}>
      <FormGroup>
        {leftColumn.map((label, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={selectedOptions.includes(index)}
                onChange={handleChange(index)}
                name={label}
                sx={{
                  transform: {
                    xs: 'scale(0.8)',
                    sm: 'scale(0.9)',
                    md: 'scale(1)',
                  },
                  padding: '4px',
                }}
              />
            }
            label={label}
            sx={{
              '& .MuiFormControlLabel-label': {
                fontSize: {
                  xs: '0.7rem',
                  sm: '0.8rem',
                  md: '1rem',
                },
              },
            }}
          />
        ))}
      </FormGroup>
      <FormGroup>
        {rightColumn.map((label, index) => (
          <FormControlLabel
            key={index + half}
            control={
              <Checkbox
                checked={selectedOptions.includes(index + half)}
                onChange={handleChange(index + half)}
                name={label}
                sx={{
                  transform: {
                    xs: 'scale(0.8)',
                    sm: 'scale(0.9)',
                    md: 'scale(1)',
                  },
                  padding: '4px',
                }}
              />
            }
            label={label}
            sx={{
              '& .MuiFormControlLabel-label': {
                fontSize: {
                  xs: '0.7rem',
                  sm: '0.8rem',
                  md: '1rem',
                },
              },
            }}
          />
        ))}
      </FormGroup>
    </Box>
  );
}

export default SelectCheckbox;
