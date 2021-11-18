import React from 'react';
import { Grid } from '@mui/material';
import NavBar from '../ui/NavBar';
import AuthenticationCard from '../components/AuthenticationCard';

const Authentication = ({ match, history }) => {
  const { params } = match;
  const { page } = params;

  return (
    <>
      <Grid container spacing={10}>
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <Grid item container style={{ marginTop: 50 }}>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <AuthenticationCard page={page} history={history} />
          </Grid>
          <Grid item xs={4} />
        </Grid>
      </Grid>
    </>
  );
};

export default Authentication;
