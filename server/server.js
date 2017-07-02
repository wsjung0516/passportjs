require('rootpath')();
var express = require('express');
var session = require('express-session');
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');

var app = express();
app.use(session({
    secret: '1234DSFs@adf1234!@#$asd',
    resave: false,
    saveUninitialized: true
}));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use('/users', require('./controllers/users.controller'));

// start server
var port = process.env.NODE_ENV === 'production' ? 80 : 4000;
var server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});