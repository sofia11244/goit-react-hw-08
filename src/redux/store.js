import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contacts/slice.js";
import filtersReducer from "./filters/slice.js";
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from "./auth/slice.js";

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    contacts: contactsReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // Ignore persisted actions
        // WHY THOUGH?  
      },
    }),
});

export const persistor = persistStore(store);
export default store;