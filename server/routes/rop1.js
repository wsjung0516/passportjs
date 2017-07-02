/**
 * Created by Master on 2017-06-28.
 */
module.exports =function (app) {
    var express = require('express');
    var p1 = express.Router();

    p1.get('/r1', function (req,res) {
        res.send('hello p1/r1')

    });
    return p1;

};