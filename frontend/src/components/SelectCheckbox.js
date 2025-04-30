import React from 'react';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';

const categories = [
  '...der ethnischen Herkunft',
  '...des Geschlechts',
  '...der Religion oder der Weltanschauung',
  '...einer Behinderung',
  '...des Alters',
  '...der sexuellen Identität',
];

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

  return (
    <>
      <FormGroup>
        {categories.map((label, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={selectedOptions.includes(index)}
                onChange={handleChange(index)}
                name={label}
              />
            }
            label={label}
          />
        ))}
      </FormGroup>
    </>
  );
}

export default SelectCheckbox;
