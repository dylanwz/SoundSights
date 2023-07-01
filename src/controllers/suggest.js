import {CLIENT_ID, CLIENT_SECRET} from "../.env";

// TO-DO: Convert raw spotify data to list of top genres
async function spotify_to_genres() {
    res.send(
        "<a href='https://accounts.spotify.com/authorize?client_id=" + CLIENT_ID + "&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Faccount&scope=user-top-read'>Sign in</a>"
    )
    return;
}
// TO-DO: API for live events (get the data from the API---a Python child)
// TO-DO: Suggest places and events off of top genres

function calc_suggest