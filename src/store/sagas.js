import { all, call } from 'redux-saga/effects';
import authSagas from '../auth/sagas';
import parkingAreasSaga from '../screens/ParkingAreasScreen/sagas';
import slotsSaga from '../screens/SlotsScreen/sagas';
import feedbackSaga from '../screens/FeedbackScreen/sagas';
import adminSagas from '../screens/admin/sagas';

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([
        call(authSagas),
        call(parkingAreasSaga),
        call(slotsSaga),
        call(feedbackSaga),
        call(adminSagas),
    ]);
}
