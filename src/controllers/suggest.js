// TO-DO: API for live events (get the data from the API---a Python child -> predictHQ)
// TO-DO: Suggest places and events off of top genres

const { exec } = require('node:child_process')
// Calculating places based of genres and lists of places
function suggest(genre, placeArr, eventsArr) {
    // Match genre to types of place
    places = exec(`python /places.py arg1 arg2 arg3 arg4`);
    events = exec(`python /events.py arg1 arg2`);
    return {
        places: places,
        events: events,
    }
}
