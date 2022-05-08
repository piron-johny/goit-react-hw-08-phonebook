import { configureStore } from '@reduxjs/toolkit'
import bookSlice from './phonebookSlice'

export const store = configureStore({
  reducer: {
    phonebook: bookSlice,
  },
})