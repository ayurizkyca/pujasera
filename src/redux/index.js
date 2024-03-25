import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import cartReducer from "./cart"
import menuReducer from "./menu"
import { combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  menu: menuReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ['auth', 'cart', 'menu'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);