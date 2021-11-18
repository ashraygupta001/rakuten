import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import Authentication from './pages/Authentication';
import CartPage from './pages/CartPage';
import ProductsPage from './pages/ProductsPage';

const BaseRoutes = () => {
  return (
    <>
      <Switch>
        <Redirect exact from="/" to="/auth/login" />
        <Redirect exact from="/auth" to="/auth/login" />
        <Route
          exact
          path="/auth/:page?"
          render={({ match, history }) => <Authentication match={match} history={history} />}
        />
        <Route path="/products">
          <ProductsPage />
        </Route>
        <Route path="/cart">
          <CartPage />
        </Route>
        <Route path="/admin">
          <AdminPage />
        </Route>
      </Switch>
    </>
  );
};

export default BaseRoutes;
