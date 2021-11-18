import React from 'react';
import { Button } from '@mui/material';

const CartManagement = ({ userCart, productId, addProductInCart }) => {
  for (let i = 0; i < userCart.length; i++) {
    if (userCart[i] === productId) {
      return (
        <>
          <Button color="error" onClick={addProductInCart}>
            Remove From Cart
          </Button>
        </>
      );
    }
  }
  return (
    <>
      <Button color="success">Add To Cart</Button>
    </>
  );
};

export default CartManagement;
