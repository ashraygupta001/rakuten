import React, { useState } from 'react';
import { Paper, Tabs, Tab, Grid } from '@mui/material';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import SignUp from './SignUp';
import LogIn from './Login';

const AuthenticationCard = ({ page, history }) => {
  const tabNameToIndex = {
    0: 'login',
    1: 'signup',
  };

  const indexToTabName = {
    login: 0,
    signup: 1,
  };

  const [value, setValue] = useState(indexToTabName[page]);

  const handleChange = (event, newValue) => {
    history.push(`/auth/${tabNameToIndex[newValue]}`);
    setValue(newValue);
  };
  return (
    <>
      <Paper component="div" elevation={4}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          centered
        >
          <Tab
            icon={<LoginRoundedIcon />}
            iconPosition="start"
            label="Login"
            sx={{ marginRight: 12 }}
          />
          <Tab
            icon={<PersonAddRoundedIcon />}
            iconPosition="start"
            label="Sign Up"
            sx={{ marginLeft: 12 }}
          />
        </Tabs>
        <Paper style={{ paddingTop: '40px', height: '300px' }}>
          <Grid container style={{ marginLeft: '200px' }}>
            {value === 0 ? <LogIn /> : <SignUp />}
          </Grid>
        </Paper>
      </Paper>
    </>
  );
};

export default AuthenticationCard;
