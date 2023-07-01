import exec from 'node:child_process'
// TO-DO: Suggest places and events off of top genres

// finds location/cities near user and events in nearby areas
function findPlacesAndEvents(genresArtists, placeArr) {

    // Places input: country - id - location - q(uery)
    places = exec(`python /places.py '\"\"' '\"\"' '\"\"' 'Sydney'`);

    // Events: category - country - title (of event)
        // Outputs dictionary of event: event details
    events = exec(`python /events.py concerts '\"\"' 'AU', '\"\"'`);


    return {
        places: places,
        events: events,
    }
}

// Sort genre-matched places by frequency
function suggest(genresArtists, placeArr) {
    sortedPlaces = [];
    return sortedPlaces;
}
