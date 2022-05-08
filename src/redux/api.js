import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = 'https://626e718e034ec185d33ca772.mockapi.io/contacts';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, {rejectWithValue}) => {
    try {
      const res = await axios.get(BASE_URL);
      if(res.status !== 200) throw Error ('Server error !');
      return res.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const createContact = createAsyncThunk(
  'contacts/createContact',
  async (item, {rejectWithValue, dispatch}) => {
    try {
      const res = await axios.post(BASE_URL, item);
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
      const res = await axios.delete(`${BASE_URL}/${id}`);
      if(res.status !== 200) throw Error ('Server error !');
      dispatch(fetchContacts())
      return
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)