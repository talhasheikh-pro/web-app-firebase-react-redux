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

const initialState = {
    slotsInProgess: false,
    activeParkingSlots: [],
    activeParkingAreaId: null,
    actionParkingReservations: null,

    fetchReservedSlotsInProgress: false,
    reservedSlots: [],

    startDateTime: null,
    endDateTime: null,

    slotId: null,
    slotReservationInProgress: false,
    slotRevervationSuccess: false,
    reservedSlot: null,

    error: null,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case PARKING_SLOTS_REQUESTED: {
            const { parkingAreaId } = action;
            return {
                ...state,
                slotsInProgess: true,
                activeParkingAreaId: parkingAreaId,
                activeParkingSlots: null,
                error: null,
            };
        }
        case PARKING_SLOTS_SUCCEEDED: {
            const { activeParkingSlots } = action;
            return {
                ...state,
                slotsInProgess: false,
                activeParkingSlots,
                error: null,
            };
        }
        case PARKING_SLOTS_FAILED: {
            const { error } = action;
            return {
                ...state,
                slotsInProgess: false,
                error,
            };
        }
        case RESERVED_SLOTS_REQUESTED: {
            const { startDateTime, endDateTime } = action;
            return {
                ...state,
                fetchReservedSlotsInProgress: true,
                error: null,
                slotRevervationSuccess: false,
                startDateTime,
                endDateTime,
            };
        }
        case RESERVED_SLOTS_SUCCEEDED: {
            const { reservedSlots } = action;
            return {
                ...state,
                reservedSlots,
                fetchReservedSlotsInProgress: false,
                error: null,
            };
        }
        case RESERVED_SLOTS_FAILED: {
            const { error } = action;
            return {
                ...state,
                fetchReservedSlotsInProgress: false,
                error,
            };
        }
        case SLOT_RESERVATION_REQUESTED: {
            const { startDateTime, endDateTime, slotId } = action;
            return {
                ...state,
                slotReservationInProgress: true,
                slotRevervationSuccess: false,
                error: null,
                startDateTime,
                endDateTime,
                slotId,
            };
        }
        case SLOT_RESERVATION_SUCCEEDED: {
            const { reservedSlot } = action;
            return {
                ...state,
                reservedSlot,
                slotReservationInProgress: false,
                slotRevervationSuccess: true,
                error: null,
            };
        }
        case SLOT_RESERVATION_FAILED: {
            const { error } = action;
            return {
                ...state,
                slotReservationInProgress: false,
                slotRevervationSuccess: false,
                error,
            };
        }
        default:
            return state;
    }
}
