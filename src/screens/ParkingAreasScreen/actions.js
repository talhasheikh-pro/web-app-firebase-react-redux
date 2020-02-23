import {
    PARKING_AREAS_REQUESTED,
    PARKING_AREAS_SUCCEEDED,
    PARKING_AREAS_FAILED,
} from './constants';

export function parkingAreasRequested() {
    return {
        type: PARKING_AREAS_REQUESTED,
    };
}

export function parkingAreasSucceeded(parkings) {
    return {
        type: PARKING_AREAS_SUCCEEDED,
        parkings,
    };
}

export function parkingAreasFailed(error) {
    return {
        type: PARKING_AREAS_FAILED,
        error,
    };
}
