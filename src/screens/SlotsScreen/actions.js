import {
    PARKING_SLOTS_REQUESTED,
    PARKING_SLOTS_SUCCEEDED,
    PARKING_SLOTS_FAILED,
    RESERVED_SLOTS_REQUESTED,
    RESERVED_SLOTS_SUCCEEDED,
    RESERVED_SLOTS_FAILED,
    SLOT_RESERVATION_REQUESTED,
    SLOT_RESERVATION_SUCCEEDED,
    SLOT_RESERVATION_FAILED,
} from './constants';

export function parkingSlotsRequested(parkingAreaId) {
    return {
        type: PARKING_SLOTS_REQUESTED,
        parkingAreaId,
    };
}

export function parkingSlotsSucceeded(activeParkingSlots) {
    return {
        type: PARKING_SLOTS_SUCCEEDED,
        activeParkingSlots,
    };
}

export function parkingSlotsFailed(error) {
    return {
        type: PARKING_SLOTS_FAILED,
        error,
    };
}

export function reservedSlotsRequested(startDateTime, endDateTime) {
    return {
        type: RESERVED_SLOTS_REQUESTED,
        startDateTime,
        endDateTime,
    };
}

export function reservedSlotsSucceeded(reservedSlots) {
    return {
        type: RESERVED_SLOTS_SUCCEEDED,
        reservedSlots,
    };
}

export function reservedSlotsFailed(error) {
    return {
        type: RESERVED_SLOTS_FAILED,
        error,
    };
}

export function slotReservationRequested(startDateTime, endDateTime, slotId) {
    return {
        type: SLOT_RESERVATION_REQUESTED,
        startDateTime,
        endDateTime,
        slotId,
    };
}

export function slotReservationSucceeded(reservedSlot) {
    return {
        type: SLOT_RESERVATION_SUCCEEDED,
        reservedSlot,
    };
}

export function slotReservationFailed(error) {
    return {
        type: SLOT_RESERVATION_FAILED,
        error,
    };
}
