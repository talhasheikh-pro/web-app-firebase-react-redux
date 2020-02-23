import { createSelector } from 'reselect';

export const slotsScreenState = (state) => state.slots;

export const getParkingSlots = createSelector(
    slotsScreenState,
    (state) => state.activeParkingSlots,
);

export const getActiveParkingAreaId = createSelector(
    slotsScreenState,
    (state) => state.activeParkingAreaId,
);

export const getReservedSlots = createSelector(
    slotsScreenState,
    (state) => state.reservedSlots,
);

export const getReservationStartDateTime = createSelector(
    slotsScreenState,
    (state) => state.startDateTime,
);

export const getReservationEndDateTime = createSelector(
    slotsScreenState,
    (state) => state.endDateTime,
);

export const getSlotsError = createSelector(
    slotsScreenState,
    (state) => state.error,
);

export const getSlotId = createSelector(
    slotsScreenState,
    (state) => state.slotId,
);
