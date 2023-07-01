import queryString from 'querystring';
import axios from 'axios';
import 'dotenv/config';

import http from 'http';
import express from 'express';

import NodeGeocoder from 'node-geocoder';

import {createEntry, updateEntry, getEntry} from "./datastore.js";
import fs from 'fs';
console.log('Loading OSM Database, this may take a minute...');
let amenities = JSON.parse(fs.readFileSync('amenities.json'));

const geocoder = NodeGeocoder({
    provider: 'google',
    apiKey: process.env.GOOGLE_API_KEY, // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
});

// let a = createEntry();
// console.log(getEntry(a));
// updateEntry(a, {hello: 'world'});
// console.log(getEntry(a));

// console.dir(amenities);
// console.log('Loaded!');
// console.log(amenities.filter((v) => {return v.amenity == 'pub'  && v.lon < -0.67 && v.lat < 52.0})[0]);

var app = express();


app.use("/", express.static('public'))
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('pages/index.ejs');
});

app.get('/signin', (req, res) => {
    res.redirect(
        "https://accounts.spotify.com/authorize?client_id=" + process.env.CLIENT_ID + "&response_type=code&redirect_uri=" + process.env.REDIRECT_URL + "&scope=user-top-read"
    );
})

app.get('/connect', async (req, res) => {
    const spotify_token = await axios.post(
        "https://accounts.spotify.com/api/token",
        queryString.stringify({
            grant_type: "authorization_code",
            code: req.query.code,
            redirect_uri: process.env.REDIRECT_URL,
        }),
        {
            headers: {
                Authorization: "Basic " + process.env.CLIENT_AUTHORISATION,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );
    const spotify_data = await axios.get(
        "https://api.spotify.com/v1/me/top/artists?limit=50",
        {
            headers: {
                Authorization: "Bearer " + spotify_token.data.access_token,
            },
        }
    )

    if (spotify_data.status != 200) {
        res.send('Something went wrong, this may be a limitation of the Spotify Developer Account');
        return;
    }
    console.dir(spotify_data.data.items);
   
    // Create a database entry to put the computed values in
    let id = createEntry();

    res.redirect('/results?id=' + id);
})

app.get('/results', function (req, res) {
    res.render('pages/results.ejs');
});

app.get('/queryResults', function (req, res) {
    if (!req.query || !req.query.id)
        return;
    res.send(getEntry(req.query.id));
});

app.get('/verifyAddress', async function (req, res) {
    if (!req.query || !req.query.address)
        res.send({ ok: false, location: '' });
    const response = await geocoder.geocode(req.query.address);
    if (response.length == 0)
        res.send({ ok: false, location: '' });
    else
        res.send({ ok: true, location: response[0].formattedAddress });
})


var httpServer = http.createServer(app);

httpServer.listen(3000);

console.log('Started Server!')