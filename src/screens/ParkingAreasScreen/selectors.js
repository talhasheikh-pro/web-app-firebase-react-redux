import { createSelector } from 'reselect';

export const parkingAreasScreenState = (state) => state.parkingAreas;

export const getParkingAreas = createSelector(
    parkingAreasScreenState,
    (state) => state.parkings,
);

export const getParkingAreasError = createSelector(
    parkingAreasScreenState,
    (state) => state.error,
);
