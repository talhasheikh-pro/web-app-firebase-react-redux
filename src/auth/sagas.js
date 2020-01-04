/*

'talhasheikh.pro@gmail.com', '123456'

*/
import { all, takeLatest, select, call, put } from 'redux-saga/effects';
import { USER_RESGITRATION_REQUESTED, USER_LOGIN_REQUESTED } from './constants';
import {
    userRegistrationSucceeded,
    userRegistrationFailed,
    userLoginSucceeded,
    userLoginFailed,
} from './actions';
import { registerUser, loginUser, sendEmailVerification } from '../api/';
import { parseClientError } from '../api/utils';
import { getUserCreds } from './selectors';

function* registerUserWithEmailAndPassword() {
    try {
        const creds = yield select(getUserCreds);
        const user = yield call(registerUser, creds);

        if (user) {
            yield call(sendEmailVerification);
            const message =
                'Registered Successfully, please verify your email to continue';
            yield put(userRegistrationSucceeded(user, message));
        }
    } catch (e) {
        const error = parseClientError(e);
        const message = error && error.message ? error.message : error;
        console.log(message);
        yield put(userRegistrationFailed(message));
    }
}

function* loginUserWithEmailAndPassword() {
    try {
        const creds = yield select(getUserCreds);
        const user = yield call(loginUser, creds);

        if (user) {
            const message = 'Logged in Successfully';
            yield put(userLoginSucceeded(user, message));
        }
    } catch (e) {
        const error = parseClientError(e);
        const message = error && error.message ? error.message : error;
        console.log(message);
        yield put(userLoginFailed(message));
    }
}

export default function*() {
    yield all([
        yield takeLatest(
            USER_RESGITRATION_REQUESTED,
            registerUserWithEmailAndPassword,
        ),
        yield takeLatest(USER_LOGIN_REQUESTED, loginUserWithEmailAndPassword),
    ]);
}
