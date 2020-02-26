import { createSelector } from 'reselect';

export const adminScreensState = (state) => state.admin;

export const getCancellationData = createSelector(
    adminScreensState,
    (state) => state.cancellationsData,
);

export const getFeedbackData = createSelector(
    adminScreensState,
    (state) => state.feedbackData,
);

export const getReservationsData = createSelector(
    adminScreensState,
    (state) => state.reservationsData,
);

export const getUsersData = createSelector(
    adminScreensState,
    (state) => state.usersData,
);

export const getFeedbackInProgress = createSelector(
    adminScreensState,
    (state) => state.feedbackInProgess,
);

export const getReply = createSelector(
    adminScreensState,
    (state) => state.reply,
);

export const getReplyToId = createSelector(
    adminScreensState,
    (state) => state.replyToId,
);
