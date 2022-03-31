// ARRAY
export const insertIntoArray = (arr, index, newItem) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after the specified index
    ...arr.slice(index),
];

// STRING
export const getObservation = (observation) => {
    let observationString = observation !== null && observation !== undefined ? observation : "";

    observationString = observationString.split(" ");
    if (observationString.length >= 8) {
        observationString = insertIntoArray(observationString, 6, "\n ");
    }
    console.log(observationString);
    observationString = observationString.join(" ").replace("  ", "");

    return observationString;
};
