var express = require("express");
var app = express();
var p1 = require('./rop1')(app);
var p2 = require('./rop2')();

app.use('/p1',p1 );
app.use('/p2',p2 );




if (app.get("env") === "production") {
    // in production mode run application from dist folder
    app.use(express.static(path.join(__dirname, "/../client")));
}

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("listening to port " + port);
});
