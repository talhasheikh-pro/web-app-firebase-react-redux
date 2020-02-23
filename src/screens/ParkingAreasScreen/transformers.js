export function transformParkings(parkings) {
    let transformedParkings = [];

    try {
        if (parkings) {
            parkings.forEach((doc) => {
                const { location } = doc.data();
                transformedParkings.push({
                    id: doc.id,
                    location,
                });
            });
        }
    } catch (e) {
        return e;
    }

    return transformedParkings;
}
