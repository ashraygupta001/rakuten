import React from 'react';
import { Paper, ThemeProvider } from '@mui/material';
import theme from './theme';
import AuthContextProvider from './context/AuthContext';
import Checker from './components/Checker';

const App = () => {
  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <Checker>
          <Paper style={{ minHeight: '100vh' }} />
        </Checker>
      </ThemeProvider>
    </AuthContextProvider>
  );
};

export default App;

// npx json-server --watch src/data/db.json --port 8000
