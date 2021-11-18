import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { Grid } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import TextFieldWrapper from '../ui/formui/TextFieldWrapper';
import ButtonWrapper from '../ui/formui/ButtonWrapper';

const LogIn = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const initialState = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });
  const getData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };
  const onSubmit = (values) => {
    const { email } = values;
    const { password } = values;
    const url = 'http://localhost:8000/userdetails';
    getData(url).then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].email === email && data[i].password === password) {
          localStorage.setItem('user', data[i].id);
          setAuth(data[i].id);
          if (auth === 0) {
            <Redirect to="/admin" />;
          } else {
            <Redirect to="/products" />;
          }
        }
      }
    });
  };
  return (
    <>
      {auth === -1 ? (
        <div>
          <Formik
            initialValues={{ ...initialState }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <Grid item container direction="column" spacing={2}>
                <Grid item>
                  <TextFieldWrapper name="email" label="Email" />
                </Grid>
                <Grid item>
                  <TextFieldWrapper name="password" label="Password" type="Password" />
                </Grid>
                <Grid item>
                  <ButtonWrapper text="Log In" />
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </div>
      ) : (
        <div>
          {auth === 0 ? (
            <div>
              <Redirect to="/admin" />
            </div>
          ) : (
            <div>
              <Redirect to="/products" />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default LogIn;
