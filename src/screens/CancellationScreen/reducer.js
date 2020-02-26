import {
    CANCEL_RESERVATION_REQUESTED,
    CANCEL_RESERVATION_SUCCEEDED,
    CANCEL_RESERVATION_FAILED,
    ACTIVE_RESERVATIONS_REQUESTED,
    ACTIVE_RESERVATIONS_SUCCEEDED,
    ACTIVE_RESERVATIONS_FAILED,
} from './constants';

const initialState = {
    cancelReservationInProgress: false,
    activeReservedSlotsFetchInProgress: false,

    reservationToCancelId: null,
    activeReservedSlots: [],

    error: null,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ACTIVE_RESERVATIONS_REQUESTED: {
            return {
                ...state,
                activeReservedSlotsFetchInProgress: true,
                error: null,
            };
        }
        case ACTIVE_RESERVATIONS_SUCCEEDED: {
            const { activeReservedSlots } = action;
            return {
                ...state,
                activeReservedSlotsFetchInProgress: false,
                activeReservedSlots,
                error: null,
            };
        }
        case ACTIVE_RESERVATIONS_FAILED: {
            const { error } = action;
            return {
                ...state,
                activeReservedSlotsFetchInProgress: false,
                error,
            };
        }
        case CANCEL_RESERVATION_REQUESTED: {
            const { reservationToCancelId } = action;
            return {
                ...state,
                cancelReservationInProgress: true,
                reservationToCancelId,
                error: null,
            };
        }
        case CANCEL_RESERVATION_SUCCEEDED: {
            const { activeReservedSlots } = action;
            return {
                ...state,
                cancelReservationInProgress: false,
                activeReservedSlots,
                error: null,
            };
        }
        case CANCEL_RESERVATION_FAILED: {
            const { error } = action;
            return {
                ...state,
                cancelReservationInProgress: false,
                error,
            };
        }
        default:
            return state;
    }
}
