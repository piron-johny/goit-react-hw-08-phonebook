import { createSlice } from '@reduxjs/toolkit';
import { createContact, createUser, deleteContact, fetchContacts, loginUser } from './api';

const initialState = {
  contacts: {
    items: [],
    filter: '',
  },
  isAuth: false,
  status: null,
  error: null,
}

const error = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

export const phonebookSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.contacts.filter = action.payload;
    },
  },
  extraReducers: {
    [fetchContacts.pending]: (state) => {
      state.status = 'pending';
      state.error = null;
    },
    [fetchContacts.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.contacts.items = action.payload;
    },
    [fetchContacts.rejected]: error,
    [createContact.rejected]: error,
    [deleteContact.rejected]: error,
    [createUser.fulfilled]: (state, action) => {
      const { user, token } = action.payload
      state.status = 'fulfilled';
      state.user = { ...user };
      state.token = token;
      state.error = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      const { user, token } = action.payload
      state.status = 'fulfilled';
      state.user = { ...user };
      state.token = token;
      state.error = null;
      state.isAuth = true;
    },
  }
})

export const { setFilter } = phonebookSlice.actions;

export const useGetContacts = store => store.phonebook.contacts.items;
export const useGetFilter = store => store.phonebook.contacts.filter;
export const useGetStatus = store => store.phonebook.status;
export const useGetError = store => store.phonebook.error;
export const useGetIsAuth = store => store.phonebook.isAuth;
export const useGetUser = store => store.phonebook.user;

export default phonebookSlice.reducer