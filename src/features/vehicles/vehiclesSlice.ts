import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VehicleStatus } from '../../types/vehicle.types';

interface VehiclesState {
  selectedVehicleId: string | null;
  statusFilter: VehicleStatus | 'all';
}

const initialState: VehiclesState = {
  selectedVehicleId: null,
  statusFilter: 'all',
};

const vehiclesSlice = createSlice({
  name: 'vehiclesLocal',
  initialState,
  reducers: {
    setSelectedVehicle: (state, action: PayloadAction<string | null>) => {
      state.selectedVehicleId = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<VehicleStatus | 'all'>) => {
      state.statusFilter = action.payload;
    }
  },
});

export const { setSelectedVehicle, setStatusFilter } = vehiclesSlice.actions;
export default vehiclesSlice.reducer;