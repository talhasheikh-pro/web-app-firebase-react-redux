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

const initialState = {
    cancellationsData: [],
    feedbackData: [],
    reservationsData: [],
    usersData: [],
    cancellationsDataFetchInProgress: false,
    feedbackDataFetchInProgress: false,
    reservationsDataFetchInProgress: false,
    usersDataFetchInProgress: false,
    error: null,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ALL_CANCELLATIONS_REQUESTED: {
            return {
                cancellationsDataFetchInProgress: true,
                ...state,
                error: null,
            };
        }
        case ALL_CANCELLATIONS_SUCCEEDED: {
            const { cancellationsData } = action;
            return {
                ...state,
                cancellationsDataFetchInProgress: false,
                cancellationsData,
                error: null,
            };
        }
        case ALL_CANCELLATIONS_FAILED: {
            const { error } = action;
            return {
                ...state,
                cancellationsDataFetchInProgress: false,
                error,
            };
        }
        case ALL_FEEDBACK_REQUESTED: {
            return {
                feedbackDataFetchInProgress: true,
                ...state,
                error: null,
            };
        }
        case ALL_FEEDBACK_SUCCEEDED: {
            const { feedbackData } = action;
            return {
                ...state,
                feedbackDataFetchInProgress: false,
                feedbackData,
                error: null,
            };
        }
        case ALL_FEEDBACK_FAILED: {
            const { error } = action;
            return {
                ...state,
                feedbackDataFetchInProgress: false,
                error,
            };
        }
        case ALL_RESERVATIONS_REQUESTED: {
            return {
                ...state,
                reservationsDataFetchInProgress: true,
                error: null,
            };
        }
        case ALL_RESERVATIONS_SUCCEEDED: {
            const { reservationsData } = action;
            return {
                ...state,
                reservationsDataFetchInProgress: false,
                reservationsData,
                error: null,
            };
        }
        case ALL_RESERVATIONS_FAILED: {
            const { error } = action;
            return {
                ...state,
                reservationsDataFetchInProgress: false,
                error,
            };
        }
        case ALL_USERS_REQUESTED: {
            return {
                ...state,
                usersDataFetchInProgress: true,
                error: null,
            };
        }
        case ALL_USERS_SUCCEEDED: {
            const { usersData } = action;
            return {
                ...state,
                usersDataFetchInProgress: false,
                usersData,
                error: null,
            };
        }
        case ALL_USERS_FAILED: {
            const { error } = action;
            return {
                ...state,
                usersDataFetchInProgress: false,
                error,
            };
        }
        default:
            return state;
    }
}
