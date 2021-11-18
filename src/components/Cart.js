import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';

const Cart = ({ count }) => {
  const [cartData, setCartData] = useState([]);
  const userId = parseInt(localStorage.getItem('user'), 10);
  useEffect(() => {
    const getProductsData = async () => {
      const res = await fetch('http://localhost:8000/products');
      const data = await res.json();
      return data;
    };
    getProductsData().then((data) => setCartData(data));
  }, [count]);
  return (
    <>
      {cartData ? (
        <>
          {cartData.map((Product) => {
            return (
              <Grid
                item
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                key={Product.id}
              >
                {Product.customer.find((user) => user === userId) ? (
                  <>
                    <Grid item>
                      <Typography variant="h6">{Product.title}</Typography>
                    </Grid>
                  </>
                ) : (
                  <></>
                )}
              </Grid>
            );
          })}
        </>
      ) : (
        <div>No Products</div>
      )}
    </>
  );
};

export default Cart;
