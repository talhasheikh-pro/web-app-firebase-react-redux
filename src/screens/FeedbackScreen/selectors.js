import { createSelector } from 'reselect';

export const feedbackScreenState = (state) => state.feedback;

export const getFeedbackError = createSelector(
    feedbackScreenState,
    (state) => state.error,
);

export const isFeedbackInProgess = createSelector(
    feedbackScreenState,
    (state) => state.feedbackInProgess,
);

export const getFeedback = createSelector(
    feedbackScreenState,
    (state) => state.feedback,
);
