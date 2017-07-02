/**
 * Created by Master on 2017-06-28.
 */
module.exports =function () {
    var express = require('express');
    var p2 = express.Router();

    p2.get('/r1', function (req,res) {
        res.send('hello p2/r1')

    });
    return p2;
};