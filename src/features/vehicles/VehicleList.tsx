import React from 'react';
import { 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography, 
  Chip,
  CircularProgress
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useGetVehiclesQuery, useGetVehiclesByStatusQuery } from '../../services/api';
import { setSelectedVehicle } from './vehiclesSlice';

const VehicleList: React.FC = () => {
  const dispatch = useDispatch();
  const activeFilter = useSelector((state: RootState) => state.vehiclesLocal.statusFilter);
  const isAll = activeFilter === 'all';
  
  const { data: allData, isLoading: loadingAll } = useGetVehiclesQuery(undefined, { skip: !isAll });
  const { data: statusData, isLoading: loadingStatus } = useGetVehiclesByStatusQuery(activeFilter, { skip: isAll });

  const isLoading = isAll ? loadingAll : loadingStatus;
  const vehicles = isAll ? allData?.data || [] : statusData?.data || [];

  if (isLoading) return <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>;

  return (
    <TableContainer>
      <Table size="medium">
        <TableHead>
          <TableRow sx={{ bgcolor: '#f9f9f9' }}>
            {['Vehicle', 'Driver', 'Status', 'Speed', 'Destination', 'ETA', 'Last Update', 'Location'].map((head) => (
              <TableCell key={head} sx={{ fontWeight: 'bold', color: '#555', borderBottom: '1px solid #e0e0e0' }}>
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicles.map((vehicle) => (
            <TableRow key={vehicle.id} onClick={() => dispatch(setSelectedVehicle(vehicle.id))} sx={{ cursor: 'pointer', '&:hover': { bgcolor: '#fcfcfc' } }}>
              <TableCell sx={{ color: '#1976d2', fontWeight: 'medium', textDecoration: 'underline' }}>{vehicle.vehicleNumber}</TableCell>
              <TableCell>{vehicle.driverName}</TableCell>
              <TableCell>
                <Chip 
                  label={vehicle.status.toUpperCase()} 
                  size="small"
                  sx={{ 
                    bgcolor: vehicle.status === 'delivered' ? '#e8f5e9' : '#f5f5f5',
                    color: vehicle.status === 'delivered' ? '#2e7d32' : '#666',
                    fontWeight: 'bold', 
                    borderRadius: 1
                  }}
                />
              </TableCell>
              <TableCell>{vehicle.speed} mph</TableCell>
              <TableCell>{vehicle.destination}</TableCell>
              <TableCell>-</TableCell> {/* ETA Mock */}
              <TableCell>{new Date(vehicle.lastUpdated).toLocaleDateString()} {new Date(vehicle.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</TableCell>
              <TableCell sx={{ fontSize: '0.85rem' }}>{vehicle.currentLocation.lat.toFixed(4)}, {vehicle.currentLocation.lng.toFixed(4)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VehicleList;