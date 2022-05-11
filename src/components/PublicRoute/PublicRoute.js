import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useGetIsAuth } from 'redux/authSlice';

const PublicRoute = ({children}) => {
  const isAurh =useSelector(useGetIsAuth);
  return !isAurh ? children : <Navigate to="/phonebook"/>
}

export default PublicRoute