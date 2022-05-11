import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from 'redux/api';


const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get('name');
    const email = form.get('email');
    const password = form.get('password');
    const user = { name, email, password };
    dispatch(createUser(user));
    navigate('/login', { replace: true })
  }

  return (
    <Box
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
        id='name'
        name='name'
        label='Name'
        fullWidth
        sx={{ marginY: 1 }}
      />
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
      <Link to='/' style={{ marginTop: 10 }}>You have accout ? Login</Link>
    </Box>
  )
}

export default RegisterForm