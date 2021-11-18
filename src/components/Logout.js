import React, { useContext } from 'react';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Logout = () => {
  const { setAuth } = useContext(AuthContext);
  const handelClick = () => {
    localStorage.removeItem('user');
    setAuth(-1);
  };
  return (
    <>
      <Button
        variant="contained"
        endIcon={<LogoutRoundedIcon />}
        onClick={handelClick}
        component={Link}
        to="/auth/login"
      >
        Logout
      </Button>
    </>
  );
};

export default Logout;
