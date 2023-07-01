import genres from "../genres.json" assert { type: 'json' };
import genres_dict from "../genres_dict.json" assert { type: 'json' };

// TO-DO: API for live events (get the data from the API---a Python child -> predictHQ)
// TO-DO: Suggest places and events off of top genres


function get_spotify_genres(artist_arr) {
    let num = 0, genres_res = artist_arr
        .map(artist => artist.genres)
        .flat()
        .reduce(function (all, curr) {
            const curr2 = genres_dict[curr];
            if (curr2 === undefined) console.log(curr);
            return (
                all[curr2] ? all[curr2]++ : (all[curr2] = 1), num++, all
            );
        }, {});
    Object.keys(genres_res).map(genre => genres_res[genre] *= 1/num);
    
    let sum = 0;
    Object.keys(genres_res).forEach(x => sum += genres_res[x])
    console.log(sum)
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

console.log(get_spotify_genres([
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/3HqSLMAZ3g3d5poNaI7GOU'
      },
      followers: { href: null, total: 0 },
      genres: [ 'k-pop', 'pop' ],
      href: 'https://api.spotify.com/v1/artists/3HqSLMAZ3g3d5poNaI7GOU',
      id: '3HqSLMAZ3g3d5poNaI7GOU',
      images: [ [Object], [Object], [Object] ],
      name: 'IU',
      popularity: 71,
      type: 'artist',
      uri: 'spotify:artist:3HqSLMAZ3g3d5poNaI7GOU'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/4k5fFEYgkWYrYvtOK3zVBl'
      },
      followers: { href: null, total: 0 },
      genres: [ 'k-pop' ],
      href: 'https://api.spotify.com/v1/artists/4k5fFEYgkWYrYvtOK3zVBl',
      id: '4k5fFEYgkWYrYvtOK3zVBl',
      images: [ [Object], [Object], [Object] ],
      name: 'BOL4',
      popularity: 62,
      type: 'artist',
      uri: 'spotify:artist:4k5fFEYgkWYrYvtOK3zVBl'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/06HL4z0CvFAxyc27GXpf02'
      },
      followers: { href: null, total: 0 },
      genres: [ 'pop' ],
      href: 'https://api.spotify.com/v1/artists/06HL4z0CvFAxyc27GXpf02',
      id: '06HL4z0CvFAxyc27GXpf02',
      images: [ [Object], [Object], [Object] ],
      name: 'Taylor Swift',
      popularity: 100,
      type: 'artist',
      uri: 'spotify:artist:06HL4z0CvFAxyc27GXpf02'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/5cj0lLjcoR7YOSnhnX0Po5'
      },
      followers: { href: null, total: 0 },
      genres: [ 'dance pop', 'pop' ],
      href: 'https://api.spotify.com/v1/artists/5cj0lLjcoR7YOSnhnX0Po5',
      id: '5cj0lLjcoR7YOSnhnX0Po5',
      images: [ [Object], [Object], [Object] ],
      name: 'Doja Cat',
      popularity: 85,
      type: 'artist',
      uri: 'spotify:artist:5cj0lLjcoR7YOSnhnX0Po5'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/57DlMWmbVIf2ssJ8QBpBau'
      },
      followers: { href: null, total: 0 },
      genres: [ 'indie game soundtrack', 'pixel', 'pov: indie' ],
      href: 'https://api.spotify.com/v1/artists/57DlMWmbVIf2ssJ8QBpBau',
      id: '57DlMWmbVIf2ssJ8QBpBau',
      images: [ [Object], [Object], [Object] ],
      name: 'Toby Fox',
      popularity: 70,
      type: 'artist',
      uri: 'spotify:artist:57DlMWmbVIf2ssJ8QBpBau'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/1lFLniFTaPjYCtQZvDXpqu'
      },
      followers: { href: null, total: 0 },
      genres: [ 'k-pop' ],
      href: 'https://api.spotify.com/v1/artists/1lFLniFTaPjYCtQZvDXpqu',
      id: '1lFLniFTaPjYCtQZvDXpqu',
      images: [ [Object], [Object], [Object] ],
      name: 'KIMSEJEONG',
      popularity: 50,
      type: 'artist',
      uri: 'spotify:artist:1lFLniFTaPjYCtQZvDXpqu'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/1EowJ1WwkMzkCkRomFhui7'
      },
      followers: { href: null, total: 0 },
      genres: [ 'j-pop', 'j-rock', 'japanese emo', 'visual kei' ],
      href: 'https://api.spotify.com/v1/artists/1EowJ1WwkMzkCkRomFhui7',
      id: '1EowJ1WwkMzkCkRomFhui7',
      images: [ [Object], [Object], [Object] ],
      name: 'RADWIMPS',
      popularity: 72,
      type: 'artist',
      uri: 'spotify:artist:1EowJ1WwkMzkCkRomFhui7'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/3qNVuliS40BLgXGxhdBdqu'
      },
      followers: { href: null, total: 0 },
      genres: [ 'k-pop' ],
      href: 'https://api.spotify.com/v1/artists/3qNVuliS40BLgXGxhdBdqu',
      id: '3qNVuliS40BLgXGxhdBdqu',
      images: [ [Object], [Object], [Object] ],
      name: 'TAEYEON',
      popularity: 66,
      type: 'artist',
      uri: 'spotify:artist:3qNVuliS40BLgXGxhdBdqu'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/2kxP07DLgs4xlWz8YHlvfh'
      },
      followers: { href: null, total: 0 },
      genres: [ 'indonesian r&b' ],
      href: 'https://api.spotify.com/v1/artists/2kxP07DLgs4xlWz8YHlvfh',
      id: '2kxP07DLgs4xlWz8YHlvfh',
      images: [ [Object], [Object], [Object] ],
      name: 'NIKI',
      popularity: 73,
      type: 'artist',
      uri: 'spotify:artist:2kxP07DLgs4xlWz8YHlvfh'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/246dkjvS1zLTtiykXe5h60'
      },
      followers: { href: null, total: 0 },
      genres: [ 'dfw rap', 'melodic rap', 'pop', 'rap' ],
      href: 'https://api.spotify.com/v1/artists/246dkjvS1zLTtiykXe5h60',
      id: '246dkjvS1zLTtiykXe5h60',
      images: [ [Object], [Object], [Object] ],
      name: 'Post Malone',
      popularity: 88,
      type: 'artist',
      uri: 'spotify:artist:246dkjvS1zLTtiykXe5h60'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/6eUKZXaKkcviH0Ku9w2n3V'
      },
      followers: { href: null, total: 0 },
      genres: [ 'pop', 'singer-songwriter pop', 'uk pop' ],
      href: 'https://api.spotify.com/v1/artists/6eUKZXaKkcviH0Ku9w2n3V',
      id: '6eUKZXaKkcviH0Ku9w2n3V',
      images: [ [Object], [Object], [Object] ],
      name: 'Ed Sheeran',
      popularity: 90,
      type: 'artist',
      uri: 'spotify:artist:6eUKZXaKkcviH0Ku9w2n3V'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/56sUrWqaCdTyKmSs4glQ7N'
      },
      followers: { href: null, total: 0 },
      genres: [],
      href: 'https://api.spotify.com/v1/artists/56sUrWqaCdTyKmSs4glQ7N',
      id: '56sUrWqaCdTyKmSs4glQ7N',
      images: [ [Object], [Object], [Object] ],
      name: 'ATHANASIA',
      popularity: 1,
      type: 'artist',
      uri: 'spotify:artist:56sUrWqaCdTyKmSs4glQ7N'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ'
      },
      followers: { href: null, total: 0 },
      genres: [ 'canadian contemporary r&b', 'canadian pop', 'pop' ],
      href: 'https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ',
      id: '1Xyo4u8uXC1ZmMpatF05PJ',
      images: [ [Object], [Object], [Object] ],
      name: 'The Weeknd',
      popularity: 95,
      type: 'artist',
      uri: 'spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/6qqNVTkY8uBg9cP3Jd7DAH'
      },
      followers: { href: null, total: 0 },
      genres: [ 'art pop', 'electropop', 'pop' ],
      href: 'https://api.spotify.com/v1/artists/6qqNVTkY8uBg9cP3Jd7DAH',
      id: '6qqNVTkY8uBg9cP3Jd7DAH',
      images: [ [Object], [Object], [Object] ],
      name: 'Billie Eilish',
      popularity: 87,
      type: 'artist',
      uri: 'spotify:artist:6qqNVTkY8uBg9cP3Jd7DAH'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/0nMGbTpPx4b3h5fMG9CpWJ'
      },
      followers: { href: null, total: 0 },
      genres: [ 'anime score' ],
      href: 'https://api.spotify.com/v1/artists/0nMGbTpPx4b3h5fMG9CpWJ',
      id: '0nMGbTpPx4b3h5fMG9CpWJ',
      images: [ [Object], [Object], [Object] ],
      name: 'Evan Call',
      popularity: 50,
      type: 'artist',
      uri: 'spotify:artist:0nMGbTpPx4b3h5fMG9CpWJ'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/0B2g2ZF6jP0WkaZb33iPhX'
      },
      followers: { href: null, total: 0 },
      genres: [ 'classic mandopop', 'hokkien pop' ],
      href: 'https://api.spotify.com/v1/artists/0B2g2ZF6jP0WkaZb33iPhX',
      id: '0B2g2ZF6jP0WkaZb33iPhX',
      images: [ [Object], [Object], [Object] ],
      name: 'Julie Sue',
      popularity: 44,
      type: 'artist',
      uri: 'spotify:artist:0B2g2ZF6jP0WkaZb33iPhX'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/4dpARuHxo51G3z768sgnrY'
      },
      followers: { href: null, total: 0 },
      genres: [ 'british soul', 'pop', 'pop soul', 'uk pop' ],
      href: 'https://api.spotify.com/v1/artists/4dpARuHxo51G3z768sgnrY',
      id: '4dpARuHxo51G3z768sgnrY',
      images: [ [Object], [Object], [Object] ],
      name: 'Adele',
      popularity: 85,
      type: 'artist',
      uri: 'spotify:artist:4dpARuHxo51G3z768sgnrY'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/47mIJdHORyRerp4os813jD'
      },
      followers: { href: null, total: 0 },
      genres: [ 'speedrun', 'video game music' ],
      href: 'https://api.spotify.com/v1/artists/47mIJdHORyRerp4os813jD',
      id: '47mIJdHORyRerp4os813jD',
      images: [ [Object], [Object], [Object] ],
      name: 'League of Legends',
      popularity: 76,
      type: 'artist',
      uri: 'spotify:artist:47mIJdHORyRerp4os813jD'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/5tIkXJTex4JY7cv9mmgAZx'
      },
      followers: { href: null, total: 0 },
      genres: [ 'metropopolis' ],
      href: 'https://api.spotify.com/v1/artists/5tIkXJTex4JY7cv9mmgAZx',
      id: '5tIkXJTex4JY7cv9mmgAZx',
      images: [ [Object], [Object], [Object] ],
      name: 'Ruelle',
      popularity: 61,
      type: 'artist',
      uri: 'spotify:artist:5tIkXJTex4JY7cv9mmgAZx'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/41MozSoPIsD1dJM0CLPjZF'
      },
      followers: { href: null, total: 0 },
      genres: [ 'k-pop', 'k-pop girl group', 'pop' ],
      href: 'https://api.spotify.com/v1/artists/41MozSoPIsD1dJM0CLPjZF',
      id: '41MozSoPIsD1dJM0CLPjZF',
      images: [ [Object], [Object], [Object] ],
      name: 'BLACKPINK',
      popularity: 84,
      type: 'artist',
      uri: 'spotify:artist:41MozSoPIsD1dJM0CLPjZF'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/2YvlK6lKiKVjXxsjvNbnqg'
      },
      followers: { href: null, total: 0 },
      genres: [ 'japanese vgm' ],
      href: 'https://api.spotify.com/v1/artists/2YvlK6lKiKVjXxsjvNbnqg',
      id: '2YvlK6lKiKVjXxsjvNbnqg',
      images: [ [Object], [Object], [Object] ],
      name: 'HOYO-MiX',
      popularity: 70,
      type: 'artist',
      uri: 'spotify:artist:2YvlK6lKiKVjXxsjvNbnqg'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/5pKCCKE2ajJHZ9KAiaK11H'
      },
      followers: { href: null, total: 0 },
      genres: [ 'barbadian pop', 'pop', 'urban contemporary' ],
      href: 'https://api.spotify.com/v1/artists/5pKCCKE2ajJHZ9KAiaK11H',
      id: '5pKCCKE2ajJHZ9KAiaK11H',
      images: [ [Object], [Object], [Object] ],
      name: 'Rihanna',
      popularity: 89,
      type: 'artist',
      uri: 'spotify:artist:5pKCCKE2ajJHZ9KAiaK11H'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/1z4g3DjTBBZKhvAroFlhOM'
      },
      followers: { href: null, total: 0 },
      genres: [ 'k-pop', 'k-pop girl group' ],
      href: 'https://api.spotify.com/v1/artists/1z4g3DjTBBZKhvAroFlhOM',
      id: '1z4g3DjTBBZKhvAroFlhOM',
      images: [ [Object], [Object], [Object] ],
      name: 'Red Velvet',
      popularity: 71,
      type: 'artist',
      uri: 'spotify:artist:1z4g3DjTBBZKhvAroFlhOM'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/5V1qsQHdXNm4ZEZHWvFnqQ'
      },
      followers: { href: null, total: 0 },
      genres: [ 'k-pop', 'k-pop girl group' ],
      href: 'https://api.spotify.com/v1/artists/5V1qsQHdXNm4ZEZHWvFnqQ',
      id: '5V1qsQHdXNm4ZEZHWvFnqQ',
      images: [ [Object], [Object], [Object] ],
      name: 'Dreamcatcher',
      popularity: 63,
      type: 'artist',
      uri: 'spotify:artist:5V1qsQHdXNm4ZEZHWvFnqQ'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/66CXWjxzNUsdJxJ2JdwvnR'
      },
      followers: { href: null, total: 0 },
      genres: [ 'pop' ],
      href: 'https://api.spotify.com/v1/artists/66CXWjxzNUsdJxJ2JdwvnR',
      id: '66CXWjxzNUsdJxJ2JdwvnR',
      images: [ [Object], [Object], [Object] ],
      name: 'Ariana Grande',
      popularity: 88,
      type: 'artist',
      uri: 'spotify:artist:66CXWjxzNUsdJxJ2JdwvnR'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/1AhjOkOLkbHUfcHDSErXQs'
      },
      followers: { href: null, total: 0 },
      genres: [ 'asian american hip hop' ],
      href: 'https://api.spotify.com/v1/artists/1AhjOkOLkbHUfcHDSErXQs',
      id: '1AhjOkOLkbHUfcHDSErXQs',
      images: [ [Object], [Object], [Object] ],
      name: '88rising',
      popularity: 66,
      type: 'artist',
      uri: 'spotify:artist:1AhjOkOLkbHUfcHDSErXQs'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/6KImCVD70vtIoJWnq6nGn3'
      },
      followers: { href: null, total: 0 },
      genres: [ 'pop' ],
      href: 'https://api.spotify.com/v1/artists/6KImCVD70vtIoJWnq6nGn3',
      id: '6KImCVD70vtIoJWnq6nGn3',
      images: [ [Object], [Object], [Object] ],
      name: 'Harry Styles',
      popularity: 88,
      type: 'artist',
      uri: 'spotify:artist:6KImCVD70vtIoJWnq6nGn3'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/163tK9Wjr9P9DmM0AVK7lm'
      },
      followers: { href: null, total: 0 },
      genres: [ 'art pop', 'metropopolis', 'nz pop', 'pop' ],
      href: 'https://api.spotify.com/v1/artists/163tK9Wjr9P9DmM0AVK7lm',
      id: '163tK9Wjr9P9DmM0AVK7lm',
      images: [ [Object], [Object], [Object] ],
      name: 'Lorde',
      popularity: 75,
      type: 'artist',
      uri: 'spotify:artist:163tK9Wjr9P9DmM0AVK7lm'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/5JdT0LYJdlPbTC58p60WTX'
      },
      followers: { href: null, total: 0 },
      genres: [ 'violin' ],
      href: 'https://api.spotify.com/v1/artists/5JdT0LYJdlPbTC58p60WTX',
      id: '5JdT0LYJdlPbTC58p60WTX',
      images: [ [Object], [Object], [Object] ],
      name: 'Hilary Hahn',
      popularity: 48,
      type: 'artist',
      uri: 'spotify:artist:5JdT0LYJdlPbTC58p60WTX'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/3BmGtnKgCSGYIUhmivXKWX'
      },
      followers: { href: null, total: 0 },
      genres: [ 'dance pop', 'pop', 'talent show' ],
      href: 'https://api.spotify.com/v1/artists/3BmGtnKgCSGYIUhmivXKWX',
      id: '3BmGtnKgCSGYIUhmivXKWX',
      images: [ [Object], [Object], [Object] ],
      name: 'Kelly Clarkson',
      popularity: 74,
      type: 'artist',
      uri: 'spotify:artist:3BmGtnKgCSGYIUhmivXKWX'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/6jJ0s89eD6GaHleKKya26X'
      },
      followers: { href: null, total: 0 },
      genres: [ 'pop' ],
      href: 'https://api.spotify.com/v1/artists/6jJ0s89eD6GaHleKKya26X',
      id: '6jJ0s89eD6GaHleKKya26X',
      images: [ [Object], [Object], [Object] ],
      name: 'Katy Perry',
      popularity: 83,
      type: 'artist',
      uri: 'spotify:artist:6jJ0s89eD6GaHleKKya26X'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/64tJ2EAv1R6UaZqc4iOCyj'
      },
      followers: { href: null, total: 0 },
      genres: [ 'j-pop', 'japanese teen pop' ],
      href: 'https://api.spotify.com/v1/artists/64tJ2EAv1R6UaZqc4iOCyj',
      id: '64tJ2EAv1R6UaZqc4iOCyj',
      images: [ [Object], [Object], [Object] ],
      name: 'YOASOBI',
      popularity: 78,
      type: 'artist',
      uri: 'spotify:artist:64tJ2EAv1R6UaZqc4iOCyj'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/00TKPo9MxwZ0j4ooveIxWZ'
      },
      followers: { href: null, total: 0 },
      genres: [ 'alt z', 'nyc pop' ],
      href: 'https://api.spotify.com/v1/artists/00TKPo9MxwZ0j4ooveIxWZ',
      id: '00TKPo9MxwZ0j4ooveIxWZ',
      images: [ [Object], [Object], [Object] ],
      name: 'Loote',
      popularity: 57,
      type: 'artist',
      uri: 'spotify:artist:00TKPo9MxwZ0j4ooveIxWZ'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/6VuMaDnrHyPL1p4EHjYLi7'
      },
      followers: { href: null, total: 0 },
      genres: [ 'pop', 'viral pop' ],
      href: 'https://api.spotify.com/v1/artists/6VuMaDnrHyPL1p4EHjYLi7',
      id: '6VuMaDnrHyPL1p4EHjYLi7',
      images: [ [Object], [Object], [Object] ],
      name: 'Charlie Puth',
      popularity: 83,
      type: 'artist',
      uri: 'spotify:artist:6VuMaDnrHyPL1p4EHjYLi7'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/1KCSPY1glIKqW2TotWuXOR'
      },
      followers: { href: null, total: 0 },
      genres: [ 'dance pop', 'pop' ],
      href: 'https://api.spotify.com/v1/artists/1KCSPY1glIKqW2TotWuXOR',
      id: '1KCSPY1glIKqW2TotWuXOR',
      images: [ [Object], [Object], [Object] ],
      name: 'P!nk',
      popularity: 81,
      type: 'artist',
      uri: 'spotify:artist:1KCSPY1glIKqW2TotWuXOR'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/1sXbwvCQLGZnaH0Jp2HTVc'
      },
      followers: { href: null, total: 0 },
      genres: [
        'country rock',
        'folk',
        'folk rock',
        'heartland rock',
        'mellow gold',
        'singer-songwriter',
        'soft rock'
      ],
      href: 'https://api.spotify.com/v1/artists/1sXbwvCQLGZnaH0Jp2HTVc',
      id: '1sXbwvCQLGZnaH0Jp2HTVc',
      images: [ [Object], [Object], [Object] ],
      name: 'Linda Ronstadt',
      popularity: 61,
      type: 'artist',
      uri: 'spotify:artist:1sXbwvCQLGZnaH0Jp2HTVc'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/2AfmfGFbe0A0WsTYm0SDTx'
      },
      followers: { href: null, total: 0 },
      genres: [ 'k-pop', 'k-pop girl group' ],
      href: 'https://api.spotify.com/v1/artists/2AfmfGFbe0A0WsTYm0SDTx',
      id: '2AfmfGFbe0A0WsTYm0SDTx',
      images: [ [Object], [Object], [Object] ],
      name: '(G)I-DLE',
      popularity: 77,
      type: 'artist',
      uri: 'spotify:artist:2AfmfGFbe0A0WsTYm0SDTx'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/6vWDO969PvNqNYHIOW5v0m'
      },
      followers: { href: null, total: 0 },
      genres: [ 'pop', 'r&b' ],
      href: 'https://api.spotify.com/v1/artists/6vWDO969PvNqNYHIOW5v0m',
      id: '6vWDO969PvNqNYHIOW5v0m',
      images: [ [Object], [Object], [Object] ],
      name: 'Beyoncé',
      popularity: 87,
      type: 'artist',
      uri: 'spotify:artist:6vWDO969PvNqNYHIOW5v0m'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/1McMsnEElThX1knmY4oliG'
      },
      followers: { href: null, total: 0 },
      genres: [ 'pop' ],
      href: 'https://api.spotify.com/v1/artists/1McMsnEElThX1knmY4oliG',
      id: '1McMsnEElThX1knmY4oliG',
      images: [ [Object], [Object], [Object] ],
      name: 'Olivia Rodrigo',
      popularity: 82,
      type: 'artist',
      uri: 'spotify:artist:1McMsnEElThX1knmY4oliG'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/1vCWHaC5f2uS3yhpwWbIA6'
      },
      followers: { href: null, total: 0 },
      genres: [ 'edm', 'pop', 'pop dance' ],
      href: 'https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6',
      id: '1vCWHaC5f2uS3yhpwWbIA6',
      images: [ [Object], [Object], [Object] ],
      name: 'Avicii',
      popularity: 81,
      type: 'artist',
      uri: 'spotify:artist:1vCWHaC5f2uS3yhpwWbIA6'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/00FQb4jTyendYWaN8pK0wa'
      },
      followers: { href: null, total: 0 },
      genres: [ 'art pop', 'pop' ],
      href: 'https://api.spotify.com/v1/artists/00FQb4jTyendYWaN8pK0wa',
      id: '00FQb4jTyendYWaN8pK0wa',
      images: [ [Object], [Object], [Object] ],
      name: 'Lana Del Rey',
      popularity: 90,
      type: 'artist',
      uri: 'spotify:artist:00FQb4jTyendYWaN8pK0wa'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/0p4nmQO2msCgU4IF37Wi3j'
      },
      followers: { href: null, total: 0 },
      genres: [ 'canadian pop', 'candy pop', 'pop' ],
      href: 'https://api.spotify.com/v1/artists/0p4nmQO2msCgU4IF37Wi3j',
      id: '0p4nmQO2msCgU4IF37Wi3j',
      images: [ [Object], [Object], [Object] ],
      name: 'Avril Lavigne',
      popularity: 75,
      type: 'artist',
      uri: 'spotify:artist:0p4nmQO2msCgU4IF37Wi3j'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/3ienC90A5I1X3irDyQoqWZ'
      },
      followers: { href: null, total: 0 },
      genres: [ 'c-pop', 'classic mandopop', 'kayokyoku' ],
      href: 'https://api.spotify.com/v1/artists/3ienC90A5I1X3irDyQoqWZ',
      id: '3ienC90A5I1X3irDyQoqWZ',
      images: [ [Object], [Object], [Object], [Object] ],
      name: 'Teresa Teng',
      popularity: 54,
      type: 'artist',
      uri: 'spotify:artist:3ienC90A5I1X3irDyQoqWZ'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/3l0CmX0FuQjFxr8SK7Vqag'
      },
      followers: { href: null, total: 0 },
      genres: [ 'bedroom pop', 'indie pop', 'pop', 'pov: indie' ],
      href: 'https://api.spotify.com/v1/artists/3l0CmX0FuQjFxr8SK7Vqag',
      id: '3l0CmX0FuQjFxr8SK7Vqag',
      images: [ [Object], [Object], [Object] ],
      name: 'Clairo',
      popularity: 75,
      type: 'artist',
      uri: 'spotify:artist:3l0CmX0FuQjFxr8SK7Vqag'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/4gOc8TsQed9eqnqJct2c5v'
      },
      followers: { href: null, total: 0 },
      genres: [ 'k-pop girl group' ],
      href: 'https://api.spotify.com/v1/artists/4gOc8TsQed9eqnqJct2c5v',
      id: '4gOc8TsQed9eqnqJct2c5v',
      images: [ [Object], [Object], [Object] ],
      name: 'K/DA',
      popularity: 63,
      type: 'artist',
      uri: 'spotify:artist:4gOc8TsQed9eqnqJct2c5v'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/2KC9Qb60EaY0kW4eH68vr3'
      },
      followers: { href: null, total: 0 },
      genres: [ 'k-pop', 'k-pop girl group' ],
      href: 'https://api.spotify.com/v1/artists/2KC9Qb60EaY0kW4eH68vr3',
      id: '2KC9Qb60EaY0kW4eH68vr3',
      images: [ [Object], [Object], [Object] ],
      name: 'ITZY',
      popularity: 70,
      type: 'artist',
      uri: 'spotify:artist:2KC9Qb60EaY0kW4eH68vr3'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/4gzpq5DPGxSnKTe4SA8HAU'
      },
      followers: { href: null, total: 0 },
      genres: [ 'permanent wave', 'pop' ],
      href: 'https://api.spotify.com/v1/artists/4gzpq5DPGxSnKTe4SA8HAU',
      id: '4gzpq5DPGxSnKTe4SA8HAU',
      images: [ [Object], [Object], [Object] ],
      name: 'Coldplay',
      popularity: 88,
      type: 'artist',
      uri: 'spotify:artist:4gzpq5DPGxSnKTe4SA8HAU'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/1HY2Jd0NmPuamShAr6KMms'
      },
      followers: { href: null, total: 0 },
      genres: [ 'art pop', 'dance pop', 'pop' ],
      href: 'https://api.spotify.com/v1/artists/1HY2Jd0NmPuamShAr6KMms',
      id: '1HY2Jd0NmPuamShAr6KMms',
      images: [ [Object], [Object], [Object] ],
      name: 'Lady Gaga',
      popularity: 84,
      type: 'artist',
      uri: 'spotify:artist:1HY2Jd0NmPuamShAr6KMms'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/1VcbchGlIfo3Gylxc3F076'
      },
      followers: { href: null, total: 0 },
      genres: [ 'australian rock' ],
      href: 'https://api.spotify.com/v1/artists/1VcbchGlIfo3Gylxc3F076',
      id: '1VcbchGlIfo3Gylxc3F076',
      images: [ [Object], [Object], [Object], [Object] ],
      name: 'Cold Chisel',
      popularity: 54,
      type: 'artist',
      uri: 'spotify:artist:1VcbchGlIfo3Gylxc3F076'
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/6mEQK9m2krja6X1cfsAjfl'
      },
      followers: { href: null, total: 0 },
      genres: [ 'j-pop', 'japanese teen pop' ],
      href: 'https://api.spotify.com/v1/artists/6mEQK9m2krja6X1cfsAjfl',
      id: '6mEQK9m2krja6X1cfsAjfl',
      images: [ [Object], [Object], [Object] ],
      name: 'Ado',
      popularity: 71,
      type: 'artist',
      uri: 'spotify:artist:6mEQK9m2krja6X1cfsAjfl'
    }
  ]))
    

// Sort genre-matched places by frequency
function suggest(genresArtists, placeArr) {
    sortedPlaces = [];
    return sortedPlaces;
}

