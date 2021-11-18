/* eslint-disable */
import React from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';

const TextFieldWrapper = ({ name, ...otherProps }) => {
  const [field, mata] = useField(name);
  const TextFieldConfig = {
    ...field,
    ...otherProps,
    variant: 'outlined',
  };
  if (mata && mata.error && mata.touched) {
    TextFieldConfig.error = true;
    TextFieldConfig.helperText = mata.error;
  }
  return (
    <>
      <TextField {...TextFieldConfig} />
    </>
  );
};

export default TextFieldWrapper;
