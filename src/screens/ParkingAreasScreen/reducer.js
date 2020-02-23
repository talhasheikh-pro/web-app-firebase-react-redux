import {
    PARKING_AREAS_REQUESTED,
    PARKING_AREAS_SUCCEEDED,
    PARKING_AREAS_FAILED,
} from './constants';

const initialState = {
    parkingAreasInProgess: false,
    parkings: [],
    error: null,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case PARKING_AREAS_REQUESTED: {
            return {
                ...state,
                parkingAreasInProgess: true,
                error: null,
            };
        }
        case PARKING_AREAS_SUCCEEDED: {
            const { parkings } = action;
            return {
                ...state,
                parkingAreasInProgess: false,
                parkings,
                error: null,
            };
        }
        case PARKING_AREAS_FAILED: {
            const { error } = action;
            return {
                ...state,
                parkingAreasInProgess: false,
                error,
            };
        }
        default:
            return state;
    }
}
