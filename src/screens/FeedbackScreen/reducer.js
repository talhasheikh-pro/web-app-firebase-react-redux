import {
    SUBMIT_FEEDBACK_REQUESTED,
    SUBMIT_FEEDBACK_SUCCEEDED,
    SUBMIT_FEEDBACK_FAILED,
} from './constants';

const initialState = {
    feedbackInProgess: false,
    feedback: null,
    error: null,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SUBMIT_FEEDBACK_REQUESTED: {
            const { feedback } = action;
            return {
                ...state,
                feedbackInProgess: true,
                feedback,
                error: null,
            };
        }
        case SUBMIT_FEEDBACK_SUCCEEDED: {
            return {
                ...state,
                feedbackInProgess: false,
                error: null,
            };
        }
        case SUBMIT_FEEDBACK_FAILED: {
            const { error } = action;
            return {
                ...state,
                feedbackInProgess: false,
                error,
            };
        }
        default:
            return state;
    }
}
