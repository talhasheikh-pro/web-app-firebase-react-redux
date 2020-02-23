import { createSelector } from 'reselect';

export const getAuthState = (state) => state.auth || {};

export const isUserLoggedIn = createSelector(
    getAuthState,
    (auth) => auth.isLoggedIn,
);

export const getUserCreds = createSelector(
    getAuthState,
    (auth) => auth.userCreds,
);

export const getUserDetails = createSelector(
    getAuthState,
    (auth) => auth.userDetails,
);

export const getUserId = createSelector(
    getUserDetails,
    (userDetails) => userDetails.user.uid,
);

export const getLoginError = createSelector(
    getAuthState,
    (auth) => auth.loginError,
);

export const getLoginMessage = createSelector(
    getAuthState,
    (auth) => auth.loginMessage,
);

export const getRegistrationError = createSelector(
    getAuthState,
    (auth) => auth.registrationError,
);

export const getRegistrationMessage = createSelector(
    getAuthState,
    (auth) => auth.registrationMessage,
);
