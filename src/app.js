import queryString from 'querystring';
import axios from 'axios';
import 'dotenv/config';

import http from 'http';
import express from 'express';

import NodeGeocoder from 'node-geocoder';
import session from 'express-session';


import { createEntry, updateEntry, getEntry } from "./datastore.js";
import { get_spotify_genres, suggest } from "./controllers/suggest.js"
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
app.use(session({ secret: 'Whyisthiscodebasegettingsojank', cookie: { maxAge: 60000, secure: false } }))


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

    // Now do processing
    setTimeout(async () => {
        // Get desired location
        let location = req.session.location;
        console.log(location);
        if (location == '') {
            console.log('something went wrong');
            return;
        }

        let rad = 0.3; //0.3deg ~= 30km radius

        let latL = location.latitude - rad;
        let latU = location.latitude + rad;
        let lonL = location.longitude - rad;
        let lonU = location.longitude + rad;
        // console.log(latL);
        // console.log(latU);
        // console.log(lonL);
        // console.log(lonU);
        let osm_venues = suggest(get_spotify_genres(spotify_data.data.items), {});
        let venue_keys = Object.keys(osm_venues);
        // console.dir(osm_venues);

        let result = {
            location: location,
            places: [],
        };
        // Query OSMdb (Capped at 8)
        for (let i = 0; i < Math.min(venue_keys.length, 8); i++) {
            // console.log(osm_venues[venue_keys[i]]);
            // Filter list
            let a = amenities.filter((amenity) => {
                return (
                    amenity.amenity == venue_keys[i] &&
                    amenity.lat > latL &&
                    amenity.lat < latU &&
                    amenity.lon > lonL &&
                    amenity.lon < lonU
                )
            })
            if (a.length > 1) {
                let obj = a[Math.floor(Math.random() * a.length)];
                
                // Now just check its valid
                // Cap at 5 iterations
                for(let ee = 0; ee < 10; ee++) {
                    obj = a[Math.floor(Math.random() * a.length)];
                    
                    let mapRes = (await askGoogleMaps(obj.name + ' ' + location.formattedAddress, location.lat, location.lon));
                    console.dir(mapRes);
                    if(!mapRes || !mapRes.candidates || mapRes.candidates == 0)
                        continue;
                    
                    mapRes = mapRes.candidates[0];
                    console.log(obj.name);

                    if(!mapRes.name.toLowerCase().includes(obj.name.split(' ')[0].toLowerCase()))
                        continue;
                    
                    obj['address'] = mapRes.formatted_address;
                    
                    obj['photo'] = (mapRes.photos!=null && mapRes.photos.length > 0) ? (`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${mapRes?.photos[0]?.photo_reference}&key=${process.env.GOOGLE_API_KEY}`) : null;
                    console.log('hit on attempt ' + ee)
                    break;
                }
                
                
                obj['match'] = osm_venues[venue_keys[i]];
                result.places.push(obj);
            }
        }
        updateEntry(id, result);
        // console.log('Done querying');
    }, 3000);
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
    req.session.location = response[0];
    if (response.length == 0)
        res.send({ ok: false, location: '' });
    else
        res.send({ ok: true, location: response[0].formattedAddress });
})

// app.get('/googleImg', async function(req, res) {
//     if(!req.query.reference)
//         res.send(null);
//     res.send( await getGooglePhoto(req.query.reference));
// })

async function askGoogleMaps(query, lat, lon) {
return (await axios({
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Cphoto&query=locationbias=circle%3A30000%40${lat}%2C${lon}&key=${process.env.GOOGLE_API_KEY}`,
    headers: { }
  })).data;
  
}

async function getGooglePhoto(reference) {
    if(!reference)
        return null;
    return (await axios({
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${reference}&key=${process.env.GOOGLE_API_KEY}`,
        headers: { }
      })).data;
}

var httpServer = http.createServer(app);

httpServer.listen(3000);

console.log('Started Server!')