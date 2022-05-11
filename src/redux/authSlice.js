import { createSlice } from '@reduxjs/toolkit';
import { createUser, fetchUser, loginUser, logouthUser } from './api';

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: '',
  isAuth: false,
  status: null,
  error: null,
  IsCurrentUser: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [createUser.fulfilled]: (state, {action}) => {
      const { user, token } = action.payload
      state.status = 'fulfilled';
      state.user = { ...user };
      state.token = token;
      state.error = null;
    },
    [loginUser.pending]: (state) => {
      state.status = 'pending';
    },
    [loginUser.fulfilled]: (state, action) => {
      const { user, token } = action.payload
      state.status = 'fulfilled';
      state.user = { ...user };
      state.token = token;
      state.error = null;
      state.isAuth = true;
    },
    [fetchUser.pending]: (state) => {
      state.IsCurrentUser = true;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.user = { ...action.payload.user };
      state.error = null;
      state.isAuth = true;
      state.IsCurrentUser = false;
    },
    [fetchUser.rejected]: (state) => {
      state.IsCurrentUser = false;
    },
    [logouthUser.fulfilled]: (state) => {
      state.status = 'fulfilled';
      state.user = { email: null, name: null};
      state.token = '';
      state.error = null;
      state.isAuth = false;
    },

  }
})

export const useGetIsAuth = store => store.auth.isAuth;
export const useGetUser = store => store.auth.user;
export const useGetIsCurrentUser = state => state.auth.IsCurrentUser;
export const useGetStatus = state => state.auth.status;

export default authSlice.reducer