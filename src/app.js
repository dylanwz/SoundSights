import queryString from 'querystring';
import axios from 'axios';
import 'dotenv/config';

import http from 'http';
import express from 'express';

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

app.get('/connect', async (req,res) => {
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
    console.dir(spotify_data.data.items);
    res.redirect('/suggest');
})

app.get('/suggest', function (req, res) {
    res.render('pages/index.ejs');
});

var httpServer = http.createServer(app);

httpServer.listen(3000);

console.log('Started Server!')