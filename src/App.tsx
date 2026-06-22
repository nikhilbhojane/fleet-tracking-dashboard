import React, { useEffect, Suspense } from 'react';
import { Provider } from 'react-redux';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { store } from './store/store';
import { INIT_WEBSOCKET } from './services/websocket';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Dashboard from './features/dashboard/Dashboard';

// Lazy load the detailed modal to keep the initial bundle small
const VehicleDetailModal = React.lazy(() => import('./features/vehicles/VehicleDetailModal'));

const theme = createTheme({
  palette: {
    mode: 'light', 
    background: {
      default: '#f8f9fa', // The subtle light gray behind the white cards
      paper: '#ffffff',
    },
    primary: {
      main: '#1976d2', // Standard MUI blue for the active pills
    },
    success: {
      main: '#2e7d32', // Green for the "Delivered" and "Live" badges
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const WebSocketInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    store.dispatch({ type: INIT_WEBSOCKET });
  }, []);

  return <>{children}</>;
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <WebSocketInitializer>
          <ErrorBoundary fallbackMessage="Critical System Failure. Please refresh the page.">
            <Box sx={{ minHeight: '100vh', p: 3 }}>
              
              <ErrorBoundary fallbackMessage="Unable to load the Dashboard widgets.">
                <Dashboard />
              </ErrorBoundary>

              <ErrorBoundary fallbackMessage="Failed to load vehicle details.">
                <Suspense fallback={null}>
                  <VehicleDetailModal />
                </Suspense>
              </ErrorBoundary>

            </Box>
          </ErrorBoundary>
        </WebSocketInitializer>
      </ThemeProvider>
    </Provider>
  );
}

export default App;