import React from 'react';
import { Box, Button, Typography, CircularProgress, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setStatusFilter } from '../vehicles/vehiclesSlice';
import { useGetFleetStatisticsQuery } from '../../services/api';
import { VehicleStatus } from '../../types/vehicle.types';

const StatusFilter: React.FC = () => {
  const dispatch = useDispatch();
  const activeFilter = useSelector((state: RootState) => state.vehiclesLocal.statusFilter);
  const { data, isLoading } = useGetFleetStatisticsQuery();

  if (isLoading) return <CircularProgress size={24} sx={{ m: 2 }} />;

  const stats = data?.data;

  const filters: { label: string; value: VehicleStatus | 'all'; count?: number; color: string }[] = [
    { label: 'All', value: 'all', count: stats?.total, color: '#1976d2' }, // Primary Blue
    { label: 'Idle', value: 'idle', count: stats?.idle, color: '#9e9e9e' }, // Grey
    { label: 'En Route', value: 'en_route', count: stats?.en_route, color: '#2196f3' }, // Light Blue
    { label: 'Delivered', value: 'delivered', count: stats?.delivered, color: '#2e7d32' }, // Success Green
  ];

  return (
    <Grid container spacing={1.5}>
      {filters.map((filter) => {
        const isActive = activeFilter === filter.value;
        
        return (
          <Grid size={{ xs: 6 }} key={filter.value}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => dispatch(setStatusFilter(filter.value))}
              sx={{
                justifyContent: 'center',
                borderRadius: 2,
                py: 1,
                textTransform: 'none',
                color: isActive ? 'primary.main' : 'text.primary',
                borderColor: isActive ? 'primary.main' : '#e0e0e0',
                bgcolor: isActive ? 'primary.50' : 'transparent',
                '&:hover': {
                  borderColor: isActive ? 'primary.main' : '#bdbdbd',
                  bgcolor: isActive ? 'primary.50' : 'background.default',
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {/* The colored dot */}
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: filter.color }} />
                <Typography variant="body2" sx={{ fontWeight: isActive ? 'bold' : 'medium' }}>
                  {filter.label} ( {filter.count || 0} )
                </Typography>
              </Box>
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default StatusFilter;