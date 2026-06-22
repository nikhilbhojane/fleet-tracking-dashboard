import React from 'react';
import { Box, Typography, Paper, Grid, Divider, Button } from '@mui/material';
import StatisticsPanel from './StatisticsPanel';
import StatusFilter from './StatusFilter';
import VehicleList from '../vehicles/VehicleList';

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, maxWidth: '1600px', margin: '0 auto', p: 1 }}>
      
      {/* Header Section */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
          🚚 Fleet Tracking Dashboard
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mt: -3, mb: 3 }}>
        Real-time vehicle monitoring • LogiNext Case Study
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {/* Main Layout Grid */}
      <Grid container spacing={3}>
        
        {/* ================= LEFT SIDEBAR ================= */}
        <Grid size={{ xs: 12, md: 3 }} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          
          {/* Live Updates Indicator (Styled as an outlined button in the image) */}
          <Button 
            variant="outlined" 
            color="success" 
            fullWidth 
            sx={{ borderRadius: 2, py: 1, fontWeight: 'bold', textTransform: 'none' }}
          >
            📡 Live Updates Active
          </Button>

          {/* Filters Section */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              📈 Filter by Status
            </Typography>
            <StatusFilter />
          </Box>

          <Divider />

          {/* Statistics Section */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              ⏱ Fleet Statistics
            </Typography>
            <StatisticsPanel />
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2, textAlign: 'center' }}>
              ↻ Updated 3s ago • Next update in ~3 minutes
            </Typography>
          </Box>

        </Grid>

        {/* ================= RIGHT MAIN CONTENT ================= */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Paper elevation={0} sx={{ height: '100%', bgcolor: 'background.paper', borderRadius: 2, border: '1px solid #e0e0e0' }}>
            
            {/* Table Header Row */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid #e0e0e0' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Vehicles
              </Typography>
              <Button size="small" variant="outlined" color="success" sx={{ borderRadius: 4, textTransform: 'none' }}>
                Live
              </Button>
            </Box>
            
            {/* The Data Table */}
            <VehicleList />
            
          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
};

export default Dashboard;