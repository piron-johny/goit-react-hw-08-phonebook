import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH, PAUSE,
  PERSIST, persistReducer, persistStore, PURGE,
  REGISTER, REHYDRATE
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './authSlice';
import bookSlice from './phonebookSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token']
}

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authSlice),
    phonebook: bookSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)