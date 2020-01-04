import {
    USER_RESGITRATION_REQUESTED,
    USER_RESGITRATION_SUCCEEDED,
    USER_RESGITRATION_FAILED,
    USER_LOGIN_REQUESTED,
    USER_LOGIN_SUCCEEDED,
    USER_LOGIN_FAILED,
} from './constants';

export function userRegistrationRequested(userCreds) {
    return {
        type: USER_RESGITRATION_REQUESTED,
        userCreds,
    };
}

export function userRegistrationSucceeded(userDetails, message) {
    return {
        type: USER_RESGITRATION_SUCCEEDED,
        userDetails,
        message,
    };
}

export function userRegistrationFailed(registrationError) {
    return {
        type: USER_RESGITRATION_FAILED,
        registrationError,
    };
}

export function userLoginRequested(userCreds) {
    return {
        type: USER_LOGIN_REQUESTED,
        userCreds,
    };
}

export function userLoginSucceeded(userDetails, message) {
    return {
        type: USER_LOGIN_SUCCEEDED,
        userDetails,
        message,
    };
}

export function userLoginFailed(loginError) {
    return {
        type: USER_LOGIN_FAILED,
        loginError,
    };
}
