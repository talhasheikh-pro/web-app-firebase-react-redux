import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import { parseClientError } from '../../api/utils';
import { transformActiveReservations } from './transformers';
import { getUserId } from '../../auth/selectors';
import {
    CANCEL_RESERVATION_REQUESTED,
    ACTIVE_RESERVATIONS_REQUESTED,
} from './constants';
import { fetchReservedSlotsByUserId, cancelReservation } from '../../api/';
import {
    activeReservationsSucceeded,
    activeReservationsFailed,
    cancelReservationSucceeded,
    cancelReservationFailed,
} from './actions';
import { getReservationToCancelId } from './selectors';

function* getActiveReservations() {
    try {
        const userId = yield select(getUserId);
        const activeSlots = yield call(
            fetchReservedSlotsByUserId,
            new Date(),
            userId,
        );
        const transformedSlots = yield transformActiveReservations(activeSlots);

        if (transformedSlots) {
            yield put(activeReservationsSucceeded(transformedSlots));
        }
    } catch (e) {
        const error = parseClientError(e);
        const message = error && error.message ? error.message : error;
        yield put(activeReservationsFailed(message));
    }
}

function* cancelRequestedReservation() {
    try {
        const userId = yield select(getUserId);
        const reservationId = yield select(getReservationToCancelId);
        const activeSlots = yield call(
            cancelReservation,
            userId,
            reservationId,
        );
        const transformedSlots = yield transformActiveReservations(activeSlots);

        if (transformedSlots) {
            yield put(cancelReservationSucceeded(transformedSlots));
        }
    } catch (e) {
        const error = parseClientError(e);
        const message = error && error.message ? error.message : error;
        yield put(cancelReservationFailed(message));
    }
}

export default function*() {
    yield all([
        yield takeLatest(ACTIVE_RESERVATIONS_REQUESTED, getActiveReservations),
        yield takeLatest(
            CANCEL_RESERVATION_REQUESTED,
            cancelRequestedReservation,
        ),
    ]);
}
