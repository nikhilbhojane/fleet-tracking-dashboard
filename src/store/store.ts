import { configureStore } from '@reduxjs/toolkit';
import vehiclesLocalReducer from '../features/vehicles/vehiclesSlice';
import { apiSlice } from '../services/api';
import { websocketMiddleware } from '../services/websocket';

export const store = configureStore({
  reducer: {
    vehiclesLocal: vehiclesLocalReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(websocketMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;