import genres from "../genres.json" assert { type: 'json' };
import genres_dict from "../genres_dict.json" assert { type: 'json' };
import suggestedVenues from "../suggestedVenues.json" assert { type: 'json' };
import amenities from "../amenities.json" assert { type: 'json' };
import venueToCategory from "../venueCategories.json" assert { type: 'json' }

// TO-DO: API for live events (get the data from the API---a Python child -> predictHQ)
// TO-DO: Suggest places and events off of top genres

function deundefiner(genre) {
  // First check this override
  if (genre.includes('korean') || genre.includes('kpop'))
    return 'k-pop';

  return genres.parent_genres.find((gen) => { return genre.includes(gen) })

}

export function get_spotify_genres(artist_arr) {
  let num = 0, genres_res = artist_arr
    .map(artist => artist.genres)
    .flat()
    .reduce(function (all, curr) {
      let curr2 = genres_dict[curr];
      if (curr2 === undefined) { const t = deundefiner(curr); curr2 = t ? t : "other" };
      return (
        all[curr2] ? all[curr2]++ : (all[curr2] = 1), num++, all
      );
    }, {});
  Object.keys(genres_res).map(genre => genres_res[genre] *= 1 / num);

  let sum = 0;
  Object.keys(genres_res).forEach(x => sum += genres_res[x])
  return genres_res;

}

import exec from 'node:child_process'
// TO-DO: Suggest places and events off of top genres

// finds location/cities near user and events in nearby areas
function getEvents(top_genres, userLocation) {
    const events = {};
  // Places input: country - id - location - q(uery)
//   places = exec(`python /places.py '\"\"' '\"\"' '\"\"' 'Sydney'`);

  // Events: category - country - title (of event)
  // Outputs list of event objs
  // Currently searching for events in 5km radius
  // genre -> suggest venue -> category => search!!
        // run the events finder function each for each genre, add it to events dict
    const venuesList = []
    for (const genre of top_genres) {
        const venues = suggestedVenues[`${genre}`];
        for (const venue of venues) {
            if (!venuesList.includes(venue)) {
                venuesList.push(venue);
            }
        }
    }
    for (const venue of venuesList) {
        const eventsOUT = exec(`python /events.py ${venueToCategory[venue]} '\"\"' 'AU', '\"\"' '${userLocation['latitude']} ${userLocation['longitutde']}'`);

        for (const event of eventsOUT) {
            if (events.hasOwnProperty(event.title)) {
                events[event.title].count++;
            } else {
                events[event.title] = {count: 1,
                                details: event.details
                                }
            }
            
        }
    }

    events = events.sort((a, b) => {
        return a.count <= b.count ? 1 : -1;
    })

    return events;
}

// Sort genre-matched places by frequency
export function suggest(top_genres) {
  // Filter out non-existent genres
  let k = Object.keys(top_genres);
  for(let i = 0; i < k.length; i++) {
    if(!suggestedVenues[k[i]])
      delete top_genres[k[i]];
  }
  let sorted_genres = Object.fromEntries(Object.entries(Object.keys(top_genres).map((genre) => suggestedVenues[genre].reduce(function (acc, curr) {
    return (
      acc[curr] ? acc[curr] += top_genres[genre] : acc[curr] = top_genres[genre], acc
    );
  }, {})).reduce(
    (acc, curr) => {
      Object.entries(curr).forEach(([key, val]) => {
        acc[key] ? acc[key] += val : acc[key] = val;
      });
      return acc;  
    }, {})).sort((a,b) => { return b[1] - a[1] }));
  return sorted_genres;
}

function genreToVenue(sorted_genres, suggestedVenues) {

    return bestAmenities;
}

console.log(suggest({'pop': 0.5, 'rock': 0.25, 'metal': 0.1, 'work-out': 0.1, 'bluegrass': 0.05}, {}))
