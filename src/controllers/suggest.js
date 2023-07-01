import genres from "../genres.json" assert { type: 'json' };
import genres_dict from "../genres_dict.json" assert { type: 'json' };
import suggestedVenues from "../suggestedVenues.json" assert { type: 'json' };
import suggestedVenues from "../suggestedVenues.json" assert { type: 'json' };

// TO-DO: API for live events (get the data from the API---a Python child -> predictHQ)
// TO-DO: Suggest places and events off of top genres

function deundefiner(genre) {
  // First check this override
  if (genre.includes('korean') || genre.includes('kpop'))
    return 'k-pop';

  return genres.parent_genres.find((gen) => { return genre.includes(gen) })
  return genres.parent_genres.find((gen) => { return genre.includes(gen) })

}

function get_spotify_genres(artist_arr) {
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
function suggest(top_genres, placeArr) {
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

console.log(suggest({'pop': 0.5, 'rock': 0.25, 'metal': 0.1, 'work-out': 0.1, 'bluegrass': 0.05}, {}))
