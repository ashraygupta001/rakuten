import React, { useContext, useState } from 'react';
import { Grid, Typography, Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import NavBar from '../ui/NavBar';
import Products from '../components/Products';
import { AuthContext } from '../context/AuthContext';

const ProductsPage = () => {
  const { auth } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <>
      {auth === -1 ? (
        <div>
          <Typography variant="h3">
            You are not logged in, please login in{' '}
            <Button variant="contained" component={Link} to="/auth/login">
              Login Page
            </Button>
          </Typography>
        </div>
      ) : (
        <>
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <NavBar />
            </Grid>
            <Grid
              item
              xs={12}
              style={{ backgroundColor: 'black' }}
              container
              justifyContent="center"
              alignItems="center"
            >
              <TextField
                label="search"
                variant="outlined"
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} container style={{ marginLeft: 20 }} spacing={5}>
              <Products searchTerm={searchTerm} />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default ProductsPage;
