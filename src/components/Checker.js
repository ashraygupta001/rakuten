import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import BaseRoutes from '../BaseRoutes';

const Checker = () => {
  const { setAuth } = useContext(AuthContext);
  const [isLoad, setIsLoad] = useState(0);
  useEffect(() => {
    const fetchUserFromLocalStorage = () => {
      const user = localStorage.getItem('user');
      if (user !== null && user >= 0) {
        setAuth(user);
      }
    };
    fetchUserFromLocalStorage();
    setIsLoad(1);
  }, []);
  return (
    <>
      {isLoad === 0 ? (
        <div>Loading...</div>
      ) : (
        <div>
          <BaseRoutes />
        </div>
      )}
    </>
  );
};

export default Checker;
