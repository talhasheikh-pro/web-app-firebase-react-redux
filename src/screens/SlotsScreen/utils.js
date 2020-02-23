export function filterSlotsByEndDateTimeRange(
    slots,
    startDateTimestamp,
    endDateTimestamp,
) {
    const filteredSlots = [];
    slots.forEach((slot) => {
        console.log(slot.data());
        const { end_time, start_time } = slot.data();
        const startTimeTS = convertFromSecondsToDate(
            start_time.seconds,
        ).getTime();
        const endTimeTS = convertFromSecondsToDate(end_time.seconds).getTime();

        console.log(
            startTimeTS,
            endTimeTS,
            startDateTimestamp,
            endDateTimestamp,
        );

        console.log(
            'c-1',
            startTimeTS < startDateTimestamp && startDateTimestamp < endTimeTS,
        );
        console.log(
            'c-2',
            startTimeTS < endDateTimestamp && endDateTimestamp < endTimeTS,
        );
        console.log(
            'c-3',
            startDateTimestamp < startTimeTS && startTimeTS < endDateTimestamp,
        );

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

    console.log('filteredSlots', filteredSlots);
    return filteredSlots;
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
