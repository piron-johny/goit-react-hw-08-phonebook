import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from 'redux/api';
import { useGetStatus } from 'redux/authSlice';


const LiginForm = () => {
  const dispatch =useDispatch();
  const navigate = useNavigate();
  const status = useSelector(useGetStatus);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get('email');
    const password = form.get('password');
    const user = { email, password };
    dispatch(loginUser(user));
    navigate('/phonebook', { replace: true }) // TODO !!!!
  }

  return (
    status === 'pending' ? <p>Loading...</p> : <Box
      component='form'
      onSubmit={handleSubmit}
      noValidate
      sx={{
        width: 300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        m: '10px auto'
      }}
    >
      <TextField
        id='email'
        name='email'
        label='Email'
        fullWidth
        sx={{ marginY: 1 }}
      />
      <TextField
        id='password'
        name='password'
        label='Password'
        fullWidth
        sx={{ marginY: 1 }}
      />
      <Button type='submit' variant='contained' fullWidth>Send</Button>
      <Link to='/signup' style={{ marginTop: 10 }}>Don't have accout ? Registration</Link>
    </Box>
  )
}

export default LiginForm