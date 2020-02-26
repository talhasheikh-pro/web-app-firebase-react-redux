import { convertFromSecondsToDate } from '../SlotsScreen/utils';

export function transformReservations(reservations) {
    let transformedReservations = [];

    try {
        if (reservations) {
            reservations.forEach((doc) => {
                const { start_time, end_time, slot_id, user_id } = doc.data();
                transformedReservations.push({
                    id: doc.id,
                    start_time: convertFromSecondsToDate(
                        start_time.seconds,
                    ).toString(),
                    end_time: convertFromSecondsToDate(
                        end_time.seconds,
                    ).toString(),
                    slot: slot_id.id,
                    booked_by: user_id.id,
                });
            });
        }
    } catch (e) {
        return e;
    }

    return transformedReservations;
}

export function transformUsers(users) {
    let transformedUsers = [];

    try {
        if (users) {
            users.forEach((doc) => {
                const { uid, email } = doc;
                transformedUsers.push({
                    id: uid,
                    email,
                });
            });
        }
    } catch (e) {
        return e;
    }

    return transformedUsers;
}

export function transformFeedback(feedback) {
    let transformedFeedback = [];

    try {
        if (feedback) {
            feedback.forEach((doc) => {
                const { user_id, message, reply } = doc.data();
                transformedFeedback.push({
                    id: doc.id,
                    user_id: user_id.id,
                    reply,
                    message,
                });
            });
        }
    } catch (e) {
        return e;
    }

    return transformedFeedback;
}
