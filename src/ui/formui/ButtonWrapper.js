import React from 'react';
import { Button } from '@mui/material';
import { useFormikContext } from 'formik';

const ButtonWrapper = ({ text }) => {
  const { submitForm } = useFormikContext();
  const handelSubmit = () => {
    submitForm();
  };
  return (
    <>
      <Button variant="contained" color="primary" fullWidth onClick={handelSubmit}>
        {text}
      </Button>
    </>
  );
};

export default ButtonWrapper;
