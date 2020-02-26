import { convertFromSecondsToDate } from '../SlotsScreen/utils';

export function transformActiveReservations(slots) {
    let transformedSlots = [];

    try {
        if (slots) {
            slots.forEach((doc) => {
                const { start_time, end_time, is_cancel } = doc.data();
                transformedSlots.push({
                    id: doc.id,
                    start_time: convertFromSecondsToDate(
                        start_time.seconds,
                    ).toString(),
                    end_time: convertFromSecondsToDate(
                        end_time.seconds,
                    ).toString(),
                    is_cancel,
                });
            });
        }
    } catch (e) {
        return e;
    }

    return transformedSlots;
}
