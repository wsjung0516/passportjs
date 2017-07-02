"use strict";
exports.__esModule = true;
var express = require("express");
var userRouter = express.Router();
var bkfd2Password = require('pbkdf2-password');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var hasher = bkfd2Password();

exports.userRouter = userRouter;
var user = require('../models/user_mysql');
/////////////////
userRouter.get('/', function (req, res) {
    user.findAll(function (err, rows, fields) {
        if (err)
            throw err;
        res.json(rows);
    });
});
userRouter.post('/:id', function (req, res, next) {
    var data = req.body;
    //console.log("req.body",req.body);
    if (req.params.id === 'add') {
        user.findByUsername(data.username, function (err, rows, fields) {
            if (rows.length === 1) {
                user.sendResponse(false, res);
            }
            else {
                hasher( {password: data.password}, function(err, pass, salt, hash) {
                    data = {
                        username : data.username,
                        authId : 'local:'+data.username,
                        salt : salt,
                        password : hash,
                        displayName : data.displayName
                    };
                    user.addUser(data, function (err, info) {
                        if (err) {
                            throw err;
                        }
                        user.sendResponse(true, res);
                    });
                });
            }
        });
    }
    if (req.params.id === 'delete') {
        user.findByUserid(data.id, function (err, rows, fields) {
            if (err)
                throw err;
            user.deleteUser(data, function (err, info) {
                if (err)
                    throw err;
                user.sendResponse(true, res);
            });
        });
    }
    if (req.params.id === 'authenticate') {
        //console.log(req.body);
/*
        user.authenticate(req.body.username, req.body.password)
            .then(function (user) {
                if(user) {
                    res.send(user);
                } else {
                    res.status(401).send('Username or password is incorrect');
                }

            }).catch (function (err) {
                res.status(400).send(err);
            });
*/
    }
});
userRouter.put('/:id', function (req, res, next) {
    var data = req.body;
    if (req.params.id === 'update') {
        user.findByUserid(data.id, function (err, rows, fields) {
            if (err)
                throw err;
            if (rows.length === 1) {
                user.updateUser(data, function (err, info) {
                    if (err)
                        throw err;
                    user.sendResponse(true, res);
                });
            }
        });
    }
});
