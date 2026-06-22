import { Middleware } from '@reduxjs/toolkit';
import { apiSlice } from './api';

export const INIT_WEBSOCKET = 'INIT_WEBSOCKET';

export const websocketMiddleware: Middleware = (storeAPI) => {
  let socket: WebSocket | null = null;

  return (next) => (action: any) => {
    if (action.type === INIT_WEBSOCKET) {
      if (socket !== null) {
        socket.close();
      }

      socket = new WebSocket('wss://case-study-26cf.onrender.com');

      socket.onopen = () => {
        console.log('WebSocket Connected: Listening for 3-minute updates...');
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('WebSocket update received:', data);
          // Invalidate tags to trigger a background refetch for active components
          storeAPI.dispatch(apiSlice.util.invalidateTags(['Vehicle', 'Statistics']));
        } catch (error) {
          console.error('WebSocket parsing error:', error);
        }
      };

      socket.onerror = (error) => {
        console.error('WebSocket Error:', error);
      };

      socket.onclose = () => {
        console.warn('WebSocket Disconnected. Reconnecting in 5s...');
        setTimeout(() => {
          storeAPI.dispatch({ type: INIT_WEBSOCKET });
        }, 5000);
      };
    }

    return next(action);
  };
};