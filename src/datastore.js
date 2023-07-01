let data = {};

/**
 * Creates an entry, returns the ID to the entry
 * @returns {Text} ID
 */
export function createEntry() {
    //https://stackoverflow.com/a/8084248
    // Gud enuf for now
    let id = Math.random().toString(36).substring(2, 7);

    data[id] = {};

    return id;
}

/**
 * Puts provided value into the database at provided id
 * 
 * @param {Text} id 
 * @param {*} value 
 */
export function updateEntry(id, value) {
    data[id] = value;
}

/**
 * Given an id, returns data stored in database at id
 * 
 * @param {Text} id 
 * @returns {Object} data
 */
export function getEntry(id) {
    return data[id];
}
