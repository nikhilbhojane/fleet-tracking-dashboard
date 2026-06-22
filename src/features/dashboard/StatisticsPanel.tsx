import React from 'react';
import { Box, Paper, Typography, Grid, CircularProgress } from '@mui/material';
import { useGetFleetStatisticsQuery } from '../../services/api';

const StatisticsPanel: React.FC = () => {
  const { data, isLoading, isError } = useGetFleetStatisticsQuery();

  if (isLoading) {
    return (
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !data?.success) {
    return <Typography color="error">Failed to load statistics.</Typography>;
  }

  const stats = data.data;

  // Format the timestamp for the "Last Update" card (e.g., "14:40")
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const statCards = [
    { label: 'Total Fleet', value: stats.total },
    { label: 'Avg Speed', value: stats.average_speed },
    { label: 'Moving', value: stats.en_route },
    { label: 'Last Update', value: formatTime(stats.timestamp) },
  ];

  return (
    <Grid container spacing={1.5}>
      {statCards.map((stat, index) => (
        <Grid size={{ xs: 6 }} key={index}>
          <Paper 
            variant="outlined" 
            sx={{ 
              p: 2, 
              textAlign: 'center', 
              borderRadius: 2,
              borderColor: '#e0e0e0', // Light gray border to match image
              boxShadow: 'none'
            }}
          >
            <Typography variant="h5" color="text.primary" sx={{ fontWeight: 'bold' }}>
              {stat.value}
            </Typography>
            
            {/* We use a small grey typography for the labels to match the design */}
            <Typography 
              variant="caption" 
              color="text.secondary" 
              sx={{ 
                textTransform: 'uppercase', 
                mt: 0.5, 
                display: 'block',
                fontWeight: 'bold',
                fontSize: '0.65rem',
                letterSpacing: 0.5
              }}
            >
              {stat.label}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatisticsPanel;