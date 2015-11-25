var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var https = require('https');
var fs = require('fs');
var path = require('path');

// Routes
var form = require('./routes/form');

// Heroku sets port dynamically, fallback for dev env
app.set('port', (process.env.PORT || 5000));

// Setup public folder routing
app.use(express.static(path.resolve('dist/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Facebook POST route
app.post('/', function (req, res) {
    res.sendFile(path.resolve('dist/public/index.html'));
});

// Form endpoint
app.post('/form', form.save);
app.get('/form', form.save);

// Server
var server = app.listen(app.get('port'), function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Facebook Page Performance App listening at http://%s:%s', host, port);
});