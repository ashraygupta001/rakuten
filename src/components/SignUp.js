import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import { Grid } from '@mui/material';
import TextFieldWrapper from '../ui/formui/TextFieldWrapper';
import ButtonWrapper from '../ui/formui/ButtonWrapper';
import { AuthContext } from '../context/AuthContext';

const SignIn = () => {
  const { auth } = useContext(AuthContext);
  const initialState = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Please enter password again')
      .required('Required'),
  });
  const getData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };
  const pushData = async (url, newData) => {
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(newData),
      headers: { 'Content-Type': 'application/json' },
    });
  };
  const onSubmit = (values) => {
    const { email } = values;
    const { password } = values;
    const role = 'User';
    const newData = {
      email,
      password,
      role,
      productInCart: [],
      purchasedProduct: [],
    };
    const url = 'http://localhost:8000/userdetails';
    getData(url)
      .then((data) => {
        let dataFound = false;
        for (let i = 0; i < data.length; i++) {
          if (data[i].email === email) {
            alert('User already exists try login');
            dataFound = true;
            break;
          }
        }
        if (!dataFound) {
          try {
            pushData(url, newData);
            alert('Signup completed go to login page');
          } catch (error) {
            alert(error);
          }
        }
      })
      .catch((err) => {
        alert(err);
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
                  <TextFieldWrapper
                    name="confirmPassword"
                    label="Confirm Password"
                    type="Password"
                  />
                </Grid>
                <Grid item>
                  <ButtonWrapper text="Sign Up" />
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

export default SignIn;
