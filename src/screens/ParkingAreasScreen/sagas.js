import { all, takeLatest, call, put } from 'redux-saga/effects';
import { PARKING_AREAS_REQUESTED } from './constants';
import { fetchAllParkingAreas } from '../../api/index';
import { parkingAreasSucceeded, parkingAreasFailed } from './actions';
import { parseClientError } from '../../api/utils';
import { transformParkings } from './transformers';

function* getParkingAreas() {
    try {
        const parkings = yield call(fetchAllParkingAreas);
        const transformedParkings = yield transformParkings(parkings);

        if (parkings) {
            yield put(parkingAreasSucceeded(transformedParkings));
        }
    } catch (e) {
        const error = parseClientError(e);
        const message = error && error.message ? error.message : error;
        console.log(message);
        yield put(parkingAreasFailed(message));
    }
}

export default function*() {
    yield all([yield takeLatest(PARKING_AREAS_REQUESTED, getParkingAreas)]);
}
