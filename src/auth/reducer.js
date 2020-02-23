import {
    USER_RESGITRATION_REQUESTED,
    USER_RESGITRATION_SUCCEEDED,
    USER_RESGITRATION_FAILED,
    USER_LOGIN_REQUESTED,
    USER_LOGIN_SUCCEEDED,
    USER_LOGIN_FAILED,
} from './constants';

const initialState = {
    // indicates whether the current user is logged in or not
    isLoggedIn: false,

    // auth user
    user: null,
    userCreds: null,

    // registration state indicators
    registrationInProgess: false,
    registrationError: null,
    registrationMessage: null,

    // login state indicators
    loginInProgess: false,
    loginError: null,
    loginMessage: null,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case USER_RESGITRATION_REQUESTED: {
            const { userCreds } = action;
            return {
                ...state,
                registrationInProgess: true,
                userCreds,
            };
        }
        case USER_LOGIN_REQUESTED: {
            const { userCreds } = action;
            return {
                ...state,
                loginInProgess: true,
                userCreds,
            };
        }
        case USER_RESGITRATION_SUCCEEDED: {
            const { userDetails, message } = action;
            return {
                ...state,
                registrationInProgess: false,
                registrationError: null,
                registrationMessage: message,
                userCreds: null,
                userDetails,
            };
        }
        case USER_LOGIN_SUCCEEDED: {
            const { userDetails, message } = action;
            return {
                ...state,
                loginInProgess: false,
                isLoggedIn: true,
                loginError: null,
                loginMessage: message,
                userCreds: null,
                userDetails,
            };
        }
        case USER_RESGITRATION_FAILED: {
            const { registrationError } = action;
            return {
                ...state,
                registrationInProgess: false,
                userCreds: null,
                registrationError,
            };
        }
        case USER_LOGIN_FAILED: {
            const { loginError } = action;
            return {
                ...state,
                loginInProgess: false,
                userCreds: null,
                loginError,
            };
        }
        default:
            return state;
    }
}
