/**
 * @usage - function(s) which interacts with the API, sending HTTP requests goes here
 */

import { firebaseAuth, firestore } from '../client/firebase';
import { EMAIL_VERIFICATION_REDIRECTION_URL } from '../auth/constants';
import {
    PARKING_AREAS_COLLECTION,
    SLOTS_COLLECTION,
    RESERVATIONS_COLLECTION,
    USERS_COLLECTION,
    FEEDBACK_COLLECTION,
} from '../client/constants';

/**
 * @usage - to register new user using firebase SDK
 *
 * @param {string} email - user's email to regiter with
 * @param {string} password - user's password associated with the account
 */
export async function registerUser({ email, password }) {
    return firebaseAuth.createUserWithEmailAndPassword(email, password);
}

/**
 * @usage - to sign user in using firebase SDK
 *
 * @param {string} email - user's email to login with
 * @param {string} password - user's password associated with the account
 */
export async function loginUser({ email, password }) {
    return firebaseAuth.signInWithEmailAndPassword(email, password);
}

/**
 * @usage User's email verification process via Firebase SDK
 */
export async function sendEmailVerification() {
    firebaseAuth.onAuthStateChanged(function(user) {
        if (user) {
            if (!user.emailVerified) {
                user.sendEmailVerification({
                    url: EMAIL_VERIFICATION_REDIRECTION_URL,
                });
            }
        }
    });
}

/**
 * @usage - Function to fetch all parking areas from `PARKING_AREAS_COLLECTION`
 */
export async function fetchAllParkingAreas() {
    const collection = firestore.collection(PARKING_AREAS_COLLECTION);
    return collection.get();
}

/**
 * @usage - Function to fetch all parking slots for a specific parking
 *
 * @param {string} parkingId - id of parking
 */
export async function fetchActiveParkingSlots(parkingId) {
    const collection = firestore.collection(SLOTS_COLLECTION);
    const parkingAreaRef = firestore
        .collection(PARKING_AREAS_COLLECTION)
        .doc(parkingId);

    return collection.where('pa_id', '==', parkingAreaRef).get();
}

/**
 * @usage - Function to fetch all reserved parking slots for a specific parking area
 *
 * @param {array} slots - ids of slots
 */
export async function fetchReservedSlots(slots, startDateTime) {
    const slotsRef = await firestore.collection(SLOTS_COLLECTION);

    const slotRefDocs = slots.map((slot) => {
        return slotsRef.doc(slot);
    });

    return firestore
        .collection(RESERVATIONS_COLLECTION)
        .where('slot_id', 'in', slotRefDocs)
        .where('start_time', '>=', new Date(startDateTime.setHours(0, 0, 0)))
        .where('start_time', '<=', new Date(startDateTime.setHours(23, 59, 59)))
        .where('is_cancel', '==', false)
        .get();
}

/**
 * @usage - Adds reservation for a parking spot
 *
 * @param {datetime} startDateTime
 * @param {datetime} endDateTime
 * @param {string} userId
 * @param {string} slotId
 */
export async function addReservation(
    startDateTime,
    endDateTime,
    userId,
    slotId,
) {
    const reservationCollection = firestore.collection(RESERVATIONS_COLLECTION);

    const slotRef = firestore.collection(SLOTS_COLLECTION).doc(slotId);
    const userRef = firestore.collection(USERS_COLLECTION).doc(userId);

    return reservationCollection.add({
        start_time: startDateTime,
        end_time: endDateTime,
        is_cancel: false,
        slot_id: slotRef,
        user_id: userRef,
    });
}

/**
 * @usage - Adds feedback provided by user
 *
 * @param {string} feedback
 * @param {string} userId
 */
export async function addFeedback(feedback, userId) {
    const feedbackCollection = firestore.collection(FEEDBACK_COLLECTION);

    const userRef = firestore.collection(USERS_COLLECTION).doc(userId);

    return feedbackCollection.add({
        message: feedback,
        user_id: userRef,
    });
}
