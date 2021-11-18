import React, { useEffect, useState, useContext } from 'react';
import { Card, Grid, CardMedia, CardContent, CardActions, Typography, Button } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

const Products = ({ searchTerm }) => {
  const { auth } = useContext(AuthContext);
  const [userCart, setUserCart] = useState([]);
  const [productsData, setProductsData] = useState(null);
  const [counter, setCounter] = useState(0);
  const userId = parseInt(localStorage.getItem('user'), 10);
  const getData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };
  const addProductInCart = async (productid, userArr) => {
    const arr = [...userCart, productid];
    await fetch(`http://localhost:8000/userdetails/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify({ productInCart: arr }),
      headers: { 'Content-Type': 'application/json' },
    });
    const arr2 = [...userArr, userId];
    await fetch(`http://localhost:8000/products/${productid}`, {
      method: 'PATCH',
      body: JSON.stringify({ customer: arr2 }),
      headers: { 'Content-Type': 'application/json' },
    });
    setCounter(counter + 1);
  };
  const removeProductInCart = async (productid, userArr) => {
    const arr = userCart;
    const index = arr.indexOf(productid);
    arr.splice(index, 1);
    await fetch(`http://localhost:8000/userdetails/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify({ productInCart: arr }),
      headers: { 'Content-Type': 'application/json' },
    });
    const arr2 = userArr;
    const index2 = arr.indexOf(userId);
    arr2.splice(index2, 1);
    await fetch(`http://localhost:8000/products/${productid}`, {
      method: 'PATCH',
      body: JSON.stringify({ customer: arr2 }),
      headers: { 'Content-Type': 'application/json' },
    });
    setCounter(counter + 1);
  };
  useEffect(() => {
    const url = `http://localhost:8000/userdetails?id=${userId}`;
    getData(url).then((data) => {
      setUserCart(data[0].productInCart);
    });
    const getProductsData = async () => {
      const res = await fetch('http://localhost:8000/products');
      const data = await res.json();
      return data;
    };
    getProductsData().then((data) => setProductsData(data));
  }, [counter]);
  return (
    <>
      {productsData ? (
        <>
          {productsData
            .filter((Product) => {
              if (searchTerm === '') {
                return Product;
              }
              if (Product.title.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
                return Product;
              }
              return null;
            })
            .map((Product) => {
              const productid = Product.id;
              const userArr = Product.customer;
              return (
                <Grid item xs={3} key={Product.id}>
                  <Card raised sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      src={Product.image}
                      alt="Image"
                      sx={{ height: 'auto', width: '100%' }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {Product.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {Product.description}
                      </Typography>
                    </CardContent>
                    {auth > 0 ? (
                      <>
                        <CardActions>
                          {Product.customer.find((user) => user === userId) ? (
                            <>
                              <Button
                                color="error"
                                onClick={() => removeProductInCart(productid, userArr)}
                              >
                                Remove Product from Cart
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                color="success"
                                onClick={() => addProductInCart(productid, userArr)}
                              >
                                Add product to Cart
                              </Button>
                            </>
                          )}
                        </CardActions>
                      </>
                    ) : null}
                  </Card>
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

export default Products;
