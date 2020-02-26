import { createSelector } from 'reselect';

export const cancellationScreenState = (state) => state.cancellation;

export const getReservationToCancelId = createSelector(
    cancellationScreenState,
    (state) => state.reservationToCancelId,
);

export const getActiveReservedSlots = createSelector(
    cancellationScreenState,
    (state) => state.activeReservedSlots,
);

export const getCancellationDetails = createSelector(
    cancellationScreenState,
    (state) => state.cancellationDetails,
);

export const getActiveReservedSlotsInProgress = createSelector(
    cancellationScreenState,
    (state) => state.activeReservedSlotsFetchInProgress,
);
