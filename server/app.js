"use strict";
var body_parser = require("body-parser");
var compression = require("compression");
var express = require("express");
var path = require("path");
//
var app = express();
var userRoutes = require("./routes/userRoutes");
var loginRoutes = require("./routes/loginRoutes")(app);
var cors = require('cors');

//
exports.app = app;
app.set('view engine','jade');
app.set('views','./views');

app.all('*',cors());
// app.use(passport.session());
app.disable("x-powered-by");
app.get('/template',function (req,res) {
        res.render('templ', { title: 'Hey', message: 'Hello there!'});
});
/*----------- 2017.8.9 -------------*/
/*
app.all('*',cors(), function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:3001');
    // res.header('Access-Control-Allow-Methods', 'POST GET');
    res.header('Access-Control-Allow-Headers', 'Origin','content-type', 'Accept','Access-Control-Allow-Headers, Authorization, X-Requested-With');
    // res.header('Access-Control-Allow-Credentials', true);
    // res.header('Access-Control-Max-Age', 1728000);
    next();
});
*/
/*----------------------------------*/

app.use('/', express.static(__dirname));
app.use(body_parser.json());
app.use(compression());
app.use(body_parser.urlencoded({ extended: true }));
// api routes
app.use("/api/user/", userRoutes.userRouter);
app.use("/api/auth/", loginRoutes);
//


if (app.get("env") === "production") {
    // in production mode run application from dist folder
    app.use(express.static(path.join(__dirname, "/../client")));
}
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("listening to port " + port);
});
