import {
    ALL_CANCELLATIONS_REQUESTED,
    ALL_CANCELLATIONS_SUCCEEDED,
    ALL_CANCELLATIONS_FAILED,
    ALL_FEEDBACK_REQUESTED,
    ALL_FEEDBACK_SUCCEEDED,
    ALL_FEEDBACK_FAILED,
    ALL_RESERVATIONS_REQUESTED,
    ALL_RESERVATIONS_SUCCEEDED,
    ALL_RESERVATIONS_FAILED,
    ALL_USERS_REQUESTED,
    ALL_USERS_SUCCEEDED,
    ALL_USERS_FAILED,
} from './constants';

export function allCancellationsRequested() {
    return {
        type: ALL_CANCELLATIONS_REQUESTED,
    };
}

export function allCancellationsSucceeded(cancellationsData) {
    return {
        type: ALL_CANCELLATIONS_SUCCEEDED,
        cancellationsData,
    };
}

export function allCancellationsFailed(error) {
    return {
        type: ALL_CANCELLATIONS_FAILED,
        error,
    };
}

export function allFeedbackRequested() {
    return {
        type: ALL_FEEDBACK_REQUESTED,
    };
}

export function allFeedbackSucceeded(feedbackData) {
    return {
        type: ALL_FEEDBACK_SUCCEEDED,
        feedbackData,
    };
}

export function allFeedbackFailed(error) {
    return {
        type: ALL_FEEDBACK_FAILED,
        error,
    };
}

export function allReservationsRequested() {
    return {
        type: ALL_RESERVATIONS_REQUESTED,
    };
}

export function allReservationsSucceeded(reservationsData) {
    return {
        type: ALL_RESERVATIONS_SUCCEEDED,
        reservationsData,
    };
}

export function allReservationsFailed(error) {
    return {
        type: ALL_RESERVATIONS_FAILED,
        error,
    };
}

export function allUsersRequested() {
    return {
        type: ALL_USERS_REQUESTED,
    };
}

export function allUsersSucceeded(usersData) {
    return {
        type: ALL_USERS_SUCCEEDED,
        usersData,
    };
}

export function allUsersFailed(error) {
    return {
        type: ALL_USERS_FAILED,
        error,
    };
}
