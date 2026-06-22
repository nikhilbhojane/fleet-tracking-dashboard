export type VehicleStatus = 'idle' | 'moving' | 'delivered' | 'en_route';

export interface LocationInterface {
  lat: number;
  lng: number;
}

export interface VehicleInterface {
  id: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  status: VehicleStatus;
  destination: string;
  currentLocation: LocationInterface;
  speed: number;
  lastUpdated: string;
  estimatedArrival: string | null;
  batteryLevel: number;
  fuelLevel: number;
}

export interface VehicleApiResponseInterface {
  success: boolean;
  data: VehicleInterface[];
  total: number;
  timestamp: string;
}

export interface SingleVehicleApiResponseInterface {
  success: boolean;
  data: VehicleInterface;
  timestamp: string;
}

export interface VehicleStatusApiResponseInterface extends VehicleApiResponseInterface {
  status: VehicleStatus;
}

export interface FleetStatisticsInterface {
  total: number;
  idle: number;
  en_route: number;
  delivered: number;
  average_speed: number;
  timestamp: string;
}

export interface StatisticsApiResponseInterface {
  success: boolean;
  data: FleetStatisticsInterface;
}