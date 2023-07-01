// TO-DO: Convert raw spotify data to list of top genres
// TO-DO: API for live events (get the data from the API---a Python child -> predictHQ)
// TO-DO: Suggest places and events off of top genres

const { exec } = require('node:child_process')
// Calculating places based of genres and lists of places
function suggest(genre, placeArr, eventsArr) {
    // Match genre to types of place
    places = exec('"/places.py"');
    events = exec('"/events.py"');
    return {
        places: places,
        events: events,
    }
}
