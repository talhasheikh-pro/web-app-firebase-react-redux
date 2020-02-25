import { all, takeLatest, call, put } from 'redux-saga/effects';
import {
    getAllFeedbacks,
    getAllReservations,
    getAllCancellation,
    getAllUsers,
} from '../../api/';
import {
    ALL_CANCELLATIONS_REQUESTED,
    ALL_FEEDBACK_REQUESTED,
    ALL_RESERVATIONS_REQUESTED,
    ALL_USERS_REQUESTED,
} from './constants';
import {
    allFeedbackSucceeded,
    allFeedbackFailed,
    allReservationsSucceeded,
    allReservationsFailed,
    allCancellationsSucceeded,
    allCancellationsFailed,
    allUsersSucceeded,
    allUsersFailed,
} from './actions';
import {
    transformReservations,
    transformUsers,
    transformFeedback,
} from './transformers';
import { parseClientError } from '../../api/utils';

function* fetchAllFeedback() {
    try {
        const allFeedbacks = yield call(getAllFeedbacks);
        const transformedFeedback = yield transformFeedback(allFeedbacks);

        if (transformedFeedback) {
            yield put(allFeedbackSucceeded(transformedFeedback));
        }
    } catch (e) {
        const error = parseClientError(e);
        const message = error && error.message ? error.message : error;
        yield put(allFeedbackFailed(message));
    }
}

function* fetchAllReservations() {
    try {
        const allReservations = yield call(getAllReservations);
        const transformedReservations = transformReservations(allReservations);

        if (transformedReservations) {
            yield put(allReservationsSucceeded(transformedReservations));
        }
    } catch (e) {
        const error = parseClientError(e);
        const message = error && error.message ? error.message : error;
        yield put(allReservationsFailed(message));
    }
}

function* fetchAllCancellation() {
    try {
        const allCancellations = yield call(getAllCancellation);
        const transformedAllCancellations = transformReservations(
            allCancellations,
        );

        if (transformedAllCancellations) {
            yield put(allCancellationsSucceeded(transformedAllCancellations));
        }
    } catch (e) {
        const error = parseClientError(e);
        const message = error && error.message ? error.message : error;
        yield put(allCancellationsFailed(message));
    }
}

function* fetchAllUsers() {
    try {
        const allUsers = yield call(getAllUsers);
        const transformedUsers = yield transformUsers(allUsers);

        if (transformedUsers) {
            yield put(allUsersSucceeded(transformedUsers));
        }
    } catch (e) {
        const error = parseClientError(e);
        const message = error && error.message ? error.message : error;
        yield put(allUsersFailed(message));
    }
}

export default function*() {
    yield all([
        yield takeLatest(ALL_CANCELLATIONS_REQUESTED, fetchAllCancellation),
        yield takeLatest(ALL_FEEDBACK_REQUESTED, fetchAllFeedback),
        yield takeLatest(ALL_RESERVATIONS_REQUESTED, fetchAllReservations),
        yield takeLatest(ALL_USERS_REQUESTED, fetchAllUsers),
    ]);
}
