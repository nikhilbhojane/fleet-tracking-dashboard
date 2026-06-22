import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Grid,
  IconButton,
  LinearProgress,
  Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import SpeedIcon from '@mui/icons-material/Speed';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import BatteryChargingFullOutlinedIcon from '@mui/icons-material/BatteryChargingFullOutlined';
import LocalGasStationOutlinedIcon from '@mui/icons-material/LocalGasStationOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setSelectedVehicle } from './vehiclesSlice';
import { useGetVehicleByIdQuery } from '../../services/api';

interface DetailCardProps {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  borderColor?: string;
}

const DetailCard: React.FC<DetailCardProps> = ({ label, icon, children, borderColor = '#1976d2' }) => (
  <Box
    sx={{
      p: 2,
      borderLeft: `4px solid ${borderColor}`,
      bgcolor: '#f8f9fb',
      borderRadius: 2,
      height: '100%',
      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      transition: 'box-shadow 0.2s ease',
      '&:hover': {
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      },
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
      {icon}
      <Typography
        variant="caption"
        sx={{
          color: '#888',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          fontSize: '0.68rem',
        }}
      >
        {label}
      </Typography>
    </Box>
    <Box sx={{ mt: 0.5 }}>{children}</Box>
  </Box>
);

const iconSx = (color: string) => ({ fontSize: 14, color });

const VehicleDetailModal: React.FC = () => {
  const dispatch = useDispatch();
  const selectedId = useSelector((state: RootState) => state.vehiclesLocal.selectedVehicleId);
  const { data } = useGetVehicleByIdQuery(selectedId as string, { skip: !selectedId });

  const handleClose = () => dispatch(setSelectedVehicle(null));

  if (!data?.data) return null;
  const v = data.data;

  const statusColor = '#2e7d32';
  const driverColor = '#1565c0';
  const destinationColor = '#2e7d32';
  const batteryColor = v.batteryLevel < 20 ? '#d32f2f' : '#1976d2';
  const fuelColor = '#e65100';
  const lastUpdatedColor = '#5c6bc0';

  return (
    <Dialog
      open={!!selectedId}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(30, 40, 60, 0.55)',
            backdropFilter: 'blur(2px)',
          },
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 0,
          pt: 2.5,
          px: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocalShippingOutlinedIcon sx={{ fontSize: 22, color: '#546e7a' }} />
          <Typography variant="h6" fontWeight="bold">
            {v.vehicleNumber}
          </Typography>
        </Box>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      {/* Subtitle */}
      <Box sx={{ px: 3, pb: 1, pt: 0.5 }}>
        <Typography
          variant="body2"
          sx={{
            color: '#666',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <PersonOutlineIcon sx={{ fontSize: 15, color: '#888' }} />
          {v.driverName} • {v.status.toUpperCase()}
        </Typography>
      </Box>

      {/* Content */}
      <DialogContent sx={{ px: 3, pb: 3 }}>
        <Grid container spacing={2}>
          {/* Status & Speed */}
          <Grid size={6}>
            <DetailCard
              label="Status"
              icon={<VerifiedOutlinedIcon sx={iconSx(statusColor)} />}
              borderColor={statusColor}
            >
              <Chip
                label={`✔ ${v.status.toUpperCase()}`}
                size="small"
                sx={{
                  bgcolor: '#e8f5e9',
                  color: statusColor,
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                }}
              />
            </DetailCard>
          </Grid>
          <Grid size={6}>
            <DetailCard
              label="Current Speed"
              icon={<SpeedIcon sx={iconSx('#546e7a')} />}
              borderColor={statusColor}
            >
              <Typography fontWeight="bold" fontSize="1rem">
                {v.speed} mph
              </Typography>
            </DetailCard>
          </Grid>

          {/* Driver & Phone */}
          <Grid size={6}>
            <DetailCard
              label="Driver"
              icon={<PersonOutlineIcon sx={iconSx(driverColor)} />}
              borderColor={driverColor}
            >
              <Typography fontWeight="bold" fontSize="1rem">
                {v.driverName}
              </Typography>
            </DetailCard>
          </Grid>
          <Grid size={6}>
            <DetailCard
              label="Phone"
              icon={<PhoneOutlinedIcon sx={iconSx(driverColor)} />}
              borderColor={driverColor}
            >
              <Typography fontWeight="bold" fontSize="1rem">
                {v.driverPhone}
              </Typography>
            </DetailCard>
          </Grid>

          {/* Destination & Location */}
          <Grid size={6}>
            <DetailCard
              label="Destination"
              icon={<PlaceOutlinedIcon sx={iconSx(destinationColor)} />}
              borderColor={destinationColor}
            >
              <Typography fontWeight="bold" fontSize="1rem">
                {v.destination}
              </Typography>
            </DetailCard>
          </Grid>
          <Grid size={6}>
            <DetailCard
              label="Location"
              icon={<CheckCircleOutlineIcon sx={iconSx(destinationColor)} />}
              borderColor={destinationColor}
            >
              <Typography fontWeight="bold" fontSize="0.95rem" sx={{ fontFamily: 'monospace' }}>
                {v.currentLocation.lat},
                <br />
                {v.currentLocation.lng}
              </Typography>
            </DetailCard>
          </Grid>

          {/* Battery & Fuel */}
          <Grid size={6}>
            <DetailCard
              label="Battery Level"
              icon={<BatteryChargingFullOutlinedIcon sx={iconSx(batteryColor)} />}
              borderColor={batteryColor}
            >
              <Typography fontWeight="bold" fontSize="1rem" color={v.batteryLevel < 20 ? 'error' : 'text.primary'}>
                {v.batteryLevel}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={v.batteryLevel}
                sx={{
                  mt: 0.5,
                  height: 5,
                  borderRadius: 2,
                  bgcolor: '#e0e0e0',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: batteryColor,
                    borderRadius: 2,
                  },
                }}
              />
            </DetailCard>
          </Grid>
          <Grid size={6}>
            <DetailCard
              label="Fuel Level"
              icon={<LocalGasStationOutlinedIcon sx={iconSx(fuelColor)} />}
              borderColor={fuelColor}
            >
              <Typography fontWeight="bold" fontSize="1rem">
                {v.fuelLevel}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={v.fuelLevel}
                color="warning"
                sx={{
                  mt: 0.5,
                  height: 5,
                  borderRadius: 2,
                  bgcolor: '#e0e0e0',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 2,
                  },
                }}
              />
            </DetailCard>
          </Grid>

          {/* Last Updated */}
          <Grid size={12}>
            <DetailCard
              label="Last Updated"
              icon={<AccessTimeIcon sx={iconSx(lastUpdatedColor)} />}
              borderColor={lastUpdatedColor}
            >
              <Typography fontWeight="bold" fontSize="1rem">
                {new Date(v.lastUpdated).toLocaleString()}
              </Typography>
            </DetailCard>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleDetailModal;