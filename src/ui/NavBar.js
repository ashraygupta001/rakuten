import React, { useContext } from 'react';
import { Grid, Typography, Toolbar, AppBar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { AuthContext } from '../context/AuthContext';
import Logout from '../components/Logout';

const NavBar = () => {
  const { auth } = useContext(AuthContext);
  return (
    <>
      <AppBar>
        <Toolbar>
          <Grid item container spacing={5}>
            <Grid item xs={10}>
              <Typography variant="h4">E-Com</Typography>
            </Grid>
            {auth !== -1 ? (
              <>
                <Grid item>
                  <Button
                    color="primary"
                    size="large"
                    component={Link}
                    to="/cart"
                    endIcon={<ShoppingCartOutlinedIcon />}
                  >
                    Cart
                  </Button>
                </Grid>
                <Grid item>
                  <Logout />
                </Grid>
              </>
            ) : null}
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
