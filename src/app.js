// var fs = require('fs');
var http = require('http');
// const path = require('path');

const express = require('express')

var app = express();


app.use("/", express.static('public'))
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('pages/index.ejs');
});

app.get('/suggest', function (req, res) {
    pass;
});

var httpServer = http.createServer(app);

httpServer.listen(3000);

console.log('Started Server!')