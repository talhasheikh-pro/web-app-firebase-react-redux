import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import {
    PARKING_SLOTS_REQUESTED,
    RESERVED_SLOTS_REQUESTED,
    SLOT_RESERVATION_REQUESTED,
} from './constants';
import {
    fetchActiveParkingSlots,
    fetchReservedSlots,
    addReservation,
} from '../../api/';
import {
    parkingSlotsSucceeded,
    parkingSlotsFailed,
    reservedSlotsSucceeded,
    reservedSlotsFailed,
    slotReservationSucceeded,
    slotReservationFailed,
} from './actions';
import { parseClientError } from '../../api/utils';
import {
    getActiveParkingAreaId,
    getParkingSlots,
    getReservationStartDateTime,
    getReservationEndDateTime,
    getSlotId,
} from './selectors';
import {
    transformSlots,
    transformSlotsToIds,
    transformSlotsToSlotIds,
} from './transformers';
import { filterSlotsByEndDateTimeRange } from './utils';
import { getUserId } from '../../auth/selectors';

function* getActiveParkingSlots() {
    try {
        const activeParkingId = yield select(getActiveParkingAreaId);
        const slots = yield call(fetchActiveParkingSlots, activeParkingId);
        const transformedSlots = yield transformSlots(slots);

        if (transformedSlots) {
            yield put(parkingSlotsSucceeded(transformedSlots));
        }
    } catch (e) {
        const error = parseClientError(e);
        const message = error && error.message ? error.message : error;
        yield put(parkingSlotsFailed(message));
    }
}

function* getReservedSlots() {
    try {
        const activeSlots = yield select(getParkingSlots);
        const startDateTime = yield select(getReservationStartDateTime);
        const endDateTime = yield select(getReservationEndDateTime);
        const transformSlots = yield transformSlotsToIds(activeSlots);

        const reservedSlots = yield call(
            fetchReservedSlots,
            transformSlots,
            new Date(startDateTime),
        );
        const filteredSlots = yield filterSlotsByEndDateTimeRange(
            reservedSlots,
            new Date(startDateTime).getTime(),
            new Date(endDateTime).getTime(),
        );

        const transformedReservedSlots = yield transformSlotsToSlotIds(
            filteredSlots,
        );

        if (transformedReservedSlots) {
            yield put(reservedSlotsSucceeded(transformedReservedSlots));
        }
    } catch (e) {
        const error = parseClientError(e);
        const message = error && error.message ? error.message : error;
        yield put(reservedSlotsFailed(message));
    }
}

function* reserveSlot() {
    try {
        const userId = yield select(getUserId);
        const slotId = yield select(getSlotId);
        const startDateTime = yield select(getReservationStartDateTime);
        const endDateTime = yield select(getReservationEndDateTime);
        const slotRef = yield call(
            addReservation,
            new Date(startDateTime),
            new Date(endDateTime),
            userId,
            slotId,
        );

        if (slotRef) {
            yield put(slotReservationSucceeded(slotRef.id));
        }
    } catch (e) {
        const error = parseClientError(e);
        const message = error && error.message ? error.message : error;
        yield put(slotReservationFailed(message));
    }
}

export default function*() {
    yield all([
        yield takeLatest(PARKING_SLOTS_REQUESTED, getActiveParkingSlots),
        yield takeLatest(RESERVED_SLOTS_REQUESTED, getReservedSlots),
        yield takeLatest(SLOT_RESERVATION_REQUESTED, reserveSlot),
    ]);
}
