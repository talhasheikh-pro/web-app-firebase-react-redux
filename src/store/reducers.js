import { combineReducers } from 'redux';
import auth from '../auth/reducer';
import parkingAreas from '../screens/ParkingAreasScreen/reducer';
import slots from '../screens/SlotsScreen/reducer';

export default combineReducers({
    auth,
    parkingAreas,
    slots,
});
