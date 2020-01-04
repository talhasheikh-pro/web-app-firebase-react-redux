import { all, call } from 'redux-saga/effects';
import authSagas from '../auth/sagas';

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([call(authSagas)]);
}
