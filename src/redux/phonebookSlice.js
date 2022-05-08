import { createSlice } from '@reduxjs/toolkit';
import { createContact, deleteContact, fetchContacts } from './api';

const initialState = {
  contacts: {
    items: [],
    filter: '',
  },
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
  }
})

export const { setFilter } = phonebookSlice.actions;

export const useGetContacts = store => store.phonebook.contacts.items;
export const useGetFilter = store => store.phonebook.contacts.filter;
export const useGetStatus = store => store.phonebook.status;
export const useGetError = store => store.phonebook.error;

export default phonebookSlice.reducer