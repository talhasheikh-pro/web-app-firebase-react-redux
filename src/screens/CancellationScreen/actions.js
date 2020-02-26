import {
    CANCEL_RESERVATION_REQUESTED,
    CANCEL_RESERVATION_SUCCEEDED,
    CANCEL_RESERVATION_FAILED,
    ACTIVE_RESERVATIONS_REQUESTED,
    ACTIVE_RESERVATIONS_SUCCEEDED,
    ACTIVE_RESERVATIONS_FAILED,
} from './constants';

export function activeReservationsRequested() {
    return {
        type: ACTIVE_RESERVATIONS_REQUESTED,
    };
}

export function activeReservationsSucceeded(activeReservedSlots) {
    return {
        type: ACTIVE_RESERVATIONS_SUCCEEDED,
        activeReservedSlots,
    };
}

export function activeReservationsFailed(error) {
    return {
        type: ACTIVE_RESERVATIONS_FAILED,
        error,
    };
}

export function cancelReservationRequested(reservationToCancelId) {
    return {
        type: CANCEL_RESERVATION_REQUESTED,
        reservationToCancelId,
    };
}

export function cancelReservationSucceeded(activeReservedSlots) {
    return {
        type: CANCEL_RESERVATION_SUCCEEDED,
        activeReservedSlots,
    };
}

export function cancelReservationFailed(error) {
    return {
        type: CANCEL_RESERVATION_FAILED,
        error,
    };
}
