import {
    SUBMIT_FEEDBACK_REQUESTED,
    SUBMIT_FEEDBACK_SUCCEEDED,
    SUBMIT_FEEDBACK_FAILED,
} from './constants';

export function submitFeedbackRequested(feedback) {
    return {
        type: SUBMIT_FEEDBACK_REQUESTED,
        feedback,
    };
}

export function submitFeedbackSucceeded() {
    return {
        type: SUBMIT_FEEDBACK_SUCCEEDED,
    };
}

export function submitFeedbackFailed(error) {
    return {
        type: SUBMIT_FEEDBACK_FAILED,
        error,
    };
}
