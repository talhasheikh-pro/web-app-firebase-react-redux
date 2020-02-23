export function transformSlots(slots) {
    let transformedSlots = [];

    try {
        if (slots) {
            slots.forEach((doc) => {
                const { location } = doc.data();
                transformedSlots.push({
                    id: doc.id,
                    location,
                });
            });
        }
    } catch (e) {
        return e;
    }

    return transformedSlots;
}

export function transformSlotsToIds(slots) {
    let transformedSlots = [];

    try {
        if (slots) {
            slots.forEach((doc) => {
                transformedSlots.push(doc.id);
            });
        }
    } catch (e) {
        return e;
    }

    return transformedSlots;
}

export function transformSlotsToSlotIds(slots) {
    let transformedSlots = [];

    try {
        if (slots) {
            slots.forEach((doc) => {
                const { slot_id } = doc.data();
                transformedSlots.push(slot_id.id);
            });
        }
    } catch (e) {
        return e;
    }

    return transformedSlots;
}
