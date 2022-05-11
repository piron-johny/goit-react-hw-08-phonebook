import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useGetIsAuth } from 'redux/authSlice';

const PrivateRoute = ({ children }) => {
  const isAurh = useSelector(useGetIsAuth);
  return isAurh ? children : <Navigate to="/" />
}

export default PrivateRoute