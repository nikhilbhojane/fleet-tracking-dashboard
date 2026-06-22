import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { 
  VehicleApiResponseInterface, 
  SingleVehicleApiResponseInterface, 
  VehicleStatusApiResponseInterface,
  StatisticsApiResponseInterface
} from '../types/vehicle.types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://case-study-26cf.onrender.com' }),
  tagTypes: ['Vehicle', 'Statistics'], 
  endpoints: (builder) => ({
    getVehicles: builder.query<VehicleApiResponseInterface, void>({
      query: () => '/api/vehicles',
      providesTags: ['Vehicle'],
    }),
    getVehicleById: builder.query<SingleVehicleApiResponseInterface, string>({
      query: (id) => `/api/vehicles/${id}`,
      providesTags: (result, error, id) => [{ type: 'Vehicle', id }],
    }),
    getVehiclesByStatus: builder.query<VehicleStatusApiResponseInterface, string>({
      query: (status) => `/api/vehicles/status/${status}`,
      providesTags: ['Vehicle'],
    }),
    getFleetStatistics: builder.query<StatisticsApiResponseInterface, void>({
      query: () => '/api/statistics',
      providesTags: ['Statistics'],
    }),
  }),
});

export const { 
  useGetVehiclesQuery, 
  useGetVehicleByIdQuery, 
  useGetFleetStatisticsQuery,
  useGetVehiclesByStatusQuery
} = apiSlice;