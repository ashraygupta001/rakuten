import React, { useContext, useState, useEffect } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import NavBar from '../ui/NavBar';

const AdminPage = () => {
  const { auth } = useContext(AuthContext);
  const [productData, setProductData] = useState(null);
  const getProductData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };
  useEffect(() => {
    const url = `http://localhost:8000/products`;
    getProductData(url).then((data) => {
      setProductData(data);
    });
  }, []);
  return (
    <>
      {auth !== -1 ? (
        <>
          {auth > 0 ? (
            <>
              <div>
                <Typography variant="h3">
                  Admin Access only
                  <Button variant="contained" component={Link} to="/products">
                    Product Page
                  </Button>
                </Typography>
              </div>
            </>
          ) : (
            <>
              <Grid container spacing={10}>
                <Grid item xs={12}>
                  <NavBar />
                </Grid>
                <Grid
                  item
                  xs={12}
                  container
                  direction="column"
                  spacing={3}
                  style={{ marginLeft: 10, marginRight: 20 }}
                >
                  {productData ? (
                    <>
                      {productData.map((Product) => {
                        return (
                          <>
                            <Grid item container justifyContent="space-between">
                              <Grid item>{Product.title}</Grid>
                              <Grid item>{Product.soldCount}</Grid>
                            </Grid>
                          </>
                        );
                      })}
                    </>
                  ) : (
                    <></>
                  )}
                </Grid>
              </Grid>
            </>
          )}
        </>
      ) : (
        <div>
          <Typography variant="h3">
            Admin Access only
            <Button variant="contained" component={Link} to="/auth/login">
              Login Page
            </Button>
          </Typography>
        </div>
      )}
    </>
  );
};

export default AdminPage;
