export function filterSlotsByEndDateTimeRange(
    slots,
    startDateTimestamp,
    endDateTimestamp,
) {
    const filteredSlots = [];
    slots.forEach((slot) => {
        const { end_time, start_time } = slot.data();
        const startTimeTS = convertFromSecondsToDate(
            start_time.seconds,
        ).getTime();
        const endTimeTS = convertFromSecondsToDate(end_time.seconds).getTime();

        // does time/date already has a reservation
        if (
            (startTimeTS < startDateTimestamp &&
                startDateTimestamp < endTimeTS) ||
            (startTimeTS < endDateTimestamp && endDateTimestamp < endTimeTS) ||
            (startDateTimestamp < startTimeTS && startTimeTS < endDateTimestamp)
        ) {
            filteredSlots.push(slot);
        }
    });

    return filteredSlots;
}

export function filterActiveSlots(slots) {
    const activeSlots = [];
    slots.forEach((slot) => {
        const { end_time } = slot.data();
        const endTimeTS = convertFromSecondsToDate(end_time.seconds).getTime();
        const currentTimeTS = new Date().getTime();

        // does time/date already has a reservation
        if (endTimeTS > currentTimeTS) {
            activeSlots.push(slot);
        }
    });

    return activeSlots;
}

/**
 * @usage - converts seconds to date
 *
 * @param {int} seconds
 */
export function convertFromSecondsToDate(seconds) {
    const currenDate = new Date(null);
    currenDate.setTime(seconds * 1000);

    return currenDate;
}
