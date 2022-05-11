import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = 'https://connections-api.herokuapp.com'

const axiosHeaderToken = {
  setToken(token) {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  },
  resetToken() {
    axios.defaults.headers.Authorization = '';
  } 
}

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, {rejectWithValue}) => {
    try {
      const res = await axios.get('/contacts');
      if(res.status !== 200) throw Error ('Server error !');
      return res.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const createContact = createAsyncThunk(
  'contacts/createContacts',
  async (contact, {rejectWithValue, dispatch}) => {
    try {
      const res = await axios.post('contacts', contact);
      if(res.status !== 201) throw Error ('Server error !');
      dispatch(fetchContacts())
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)


export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, {rejectWithValue, dispatch}) => {
    try {
      const res = await axios.delete(`contacts/${id}`);
      if(res.status !== 200) throw Error ('Server error !');
      dispatch(fetchContacts())
      return
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const createUser = createAsyncThunk(
  'auth/createUser',
  async (user, {rejectWithValue, dispatch}) => {
    try {
      const res = await axios.post('/users/signup', user);
      if(res.status !== 201) throw Error ('Server error !');
      axiosHeaderToken.setToken(res.data.token)
      // dispatch(fetchContacts())
      return res.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (user, {rejectWithValue, dispatch}) => {
    try {
      const res = await axios.post('/users/login', user);
      if(res.status !== 200) throw Error ('Server error !');
      axiosHeaderToken.setToken(res.data.token);
      dispatch(fetchContacts());

      return res.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, {rejectWithValue, dispatch, getState}) => {
    const state = getState();
    const token = state.auth.token;

    if(token === null) return;

    axiosHeaderToken.setToken(token);
    
    try {
      const res = await axios.get('/users/current');

      if(res.status !== 200) throw Error ('Server error !');

      return res.data

    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const logouthUser = createAsyncThunk(
  'auth/logouthUser',
  async (_, {rejectWithValue}) => {
    try {
      const res = await axios.post('/users/logout');

      if(res.status !== 200) throw Error ('Server error !');

      axiosHeaderToken.resetToken();
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)