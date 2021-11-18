import React, { useContext, useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import NavBar from '../ui/NavBar';
import Cart from '../components/Cart';

const CartPage = () => {
  const { auth } = useContext(AuthContext);
  const userId = parseInt(localStorage.getItem('user'), 10);
  const [count, setCount] = useState(0);
  const getUserData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };
  const patchUserData = async (data) => {
    const arr = [...data[0].productInCart, ...data[0].purchasedProduct];
    await fetch(`http://localhost:8000/userdetails/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify({ purchasedProduct: arr }),
      headers: { 'Content-Type': 'application/json' },
    });
    await fetch(`http://localhost:8000/userdetails/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify({ productInCart: [] }),
      headers: { 'Content-Type': 'application/json' },
    });
  };
  const getProductData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };
  const patchProductData = async (data, id, soldCount) => {
    const arr = data;
    const index = data.indexOf(userId);
    const sold = soldCount + 1;
    arr.splice(index, 1);
    await fetch(`http://localhost:8000/products/${id + 1}`, {
      method: 'PATCH',
      body: JSON.stringify({ customer: arr, soldCount: sold }),
      headers: { 'Content-Type': 'application/json' },
    });
  };
  const handelClick = () => {
    const url = `http://localhost:8000/userdetails?id=${userId}`;
    getUserData(url).then((data) => {
      patchUserData(data);
    });
    const prodUrl = `http://localhost:8000/products`;
    getProductData(prodUrl).then((data) => {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].customer.length; j++) {
          if (data[i].customer[j] === userId)
            patchProductData(data[i].customer, i, data[i].soldCount);
        }
      }
      // window.location.reload();
      alert('Order successful');
      setCount(count + 1);
    });
  };
  return (
    <>
      {auth === -1 ? (
        <div>
          <Typography variant="h3">
            You are not logged in, please login in
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
            <Grid item xs={12}>
              <Cart count={count} />
            </Grid>
            <Grid item xs={12} container justifyContent="center">
              <Grid>
                <Button color="success" variant="contained" onClick={handelClick}>
                  Purchase Products
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default CartPage;
