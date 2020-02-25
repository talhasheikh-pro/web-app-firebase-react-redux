import { combineReducers } from 'redux';
import auth from '../auth/reducer';
import parkingAreas from '../screens/ParkingAreasScreen/reducer';
import slots from '../screens/SlotsScreen/reducer';
import feedback from '../screens/FeedbackScreen/reducer';
import admin from '../screens/admin/reducer';
import storage from 'redux-persist/lib/storage';
import { USER_LOGOUT_REQUESTED } from '../auth/constants';
import { PERSIST_KEY } from './constants';

const appReducer = combineReducers({
    auth,
    parkingAreas,
    slots,
    feedback,
    admin,
});

const rootReducer = (state, action) => {
    const { type } = action;
    if (type === USER_LOGOUT_REQUESTED) {
        storage.removeItem(PERSIST_KEY);

        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;
