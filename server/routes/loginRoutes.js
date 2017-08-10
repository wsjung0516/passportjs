module.exports = function (app) {
    var express = require("express");
    var session = require("express-session");
    var MySQLStore = require('express-mysql-session')(session);
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var util = require('util');
    var FacebookStrategy = require('passport-facebook').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var loginRouter = express.Router();
    var bkfd2Password = require('pbkdf2-password');
    var hasher = bkfd2Password();
    var http = require('http');
    var cors = require('cors');
    //
    exports.loginRouter = loginRouter;
    var user = require('../models/user_mysql');
    //
    // app.use('*',cors());
    app.use(session({
        secret: '1234DSFs@adf1234!@#$asd',
        resave: false,
        saveUninitialized: true,
        store:new MySQLStore({
            host: 'ec2-52-79-93-119.ap-northeast-2.compute.amazonaws.com',
            user: 'root',
            password: 'wssj0516',
            port:3306,
            database: 'WASS'
        })
    }));
    app.use(passport.initialize());
    app.use(passport.session());

/////////////////
    passport.serializeUser(function (u,done) {
        done(null,u.authId);
    });
    passport.deserializeUser(function (id, done) {
        console.log('deserializeUser',id);
        user.findAll(function (err,users) {
            for(var i=0;i< users.length; i++) {
                var u = users[i]
                if(u.authId === id) {
                    return done(null, u);
                }
            }
        })
    });
////////////////////
    passport.use(new LocalStrategy(
        function ( username, password, done) {
            var username = username;
            var password = password;
            user.findAll(function (err,users) {
                for(var i=0;i< users.length; i++) {
                    var u = users[i];
                    if( u.username === username) {
                        return hasher({password:password, salt:u.salt}, function (err,pass,salt,hash) {
                            if( hash === u.password ) {
                                done(null, u);
                            } else {
                                done(null, false);
                            }
                        });
                    }
                }
                done(null,false);
            })

        }
    ));
    loginRouter.post('/login',
        passport.authenticate (
            'local',
            {
                successRedirect : '/api/auth/login-success',
                failureRedirect : '/api/auth/login-failure',
                failureFlash : false
            }
        )
    );
    loginRouter.get('/login-success',function (req,res) {
        user.sendResponse(true, res);
    });
    loginRouter.get('/login-failure',function (req,res) {
        user.sendResponse(false, res);
    });
////////////////////////////
    loginRouter.get('/login/facebook',
        passport.authenticate(
            'facebook', {
                authType: 'rerequest', scope: ['public_profile', 'email']
            }
        )
    );
    passport.use(new FacebookStrategy({
/*
            clientID: '1390215267682875',
            clientSecret: '4196692a5f5d5e110d99d5d3f8c77fd2',
*/
            clientID: '1390215267682875',
            clientSecret: '4196692a5f5d5e110d99d5d3f8c77fd2',
            callbackURL: "http://localhost:3000/api/auth/login/facebook/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            console.log('profile',profile);
            done ( null, profile);
        }
    ));
    loginRouter.get('/login/facebook/callback',
        passport.authenticate('facebook',
            {
                successRedirect: '/api/auth/facebook-login-success',
                failureRedirect: '/api/auth/facebook-login-failure'
            }));
    loginRouter.get('/facebook-login-success',function (req,res) {
        res.send('facebook is called');
        user.sendResponse(true, res);
    });
    loginRouter.get('/facebook-login-failure',function (req,res) {
        res.send('facebook error is called');
        user.sendResponse(false, res);
    });


////////////////////////////
    passport.use(new GoogleStrategy({
            clientID: '456474365940-ujk4acdlul560gb205pcfjsdmmt323ej.apps.googleusercontent.com',
            clientSecret: 'zHasod6zXZcZ-WxfAOl1kBEc',
            callbackURL: "/api/auth/login/google/callback",
            passReqToCallback   : true
        },
        function(accessToken, refreshToken, profile, done) {
                console.log("profile",profile);
               process.nextTick(function () {
                  return done(null, profile);
               });
          //  User.findOrCreate({ googleId: profile.id }, function (err, user) {
          //  });
        }
    ));

    loginRouter.get('/login/google',
        passport.authenticate(
            'google', { scope: ['profile'] } ), function (req,res) {
                res.send('google called');
        });
/*
            'google', { scope: ["https://www.googleapis.com/auth/plus.login",
                "https://www.googleapis.com/auth/plus.profile.emails.read"] } ));
*/

    loginRouter.get('/login/google/callback',
        passport.authenticate('google',
            {
                failureRedirect: '/api/auth/google-login-failure'
            }),function (req,res) {
                console.log("req.query", req.query);
                res.redirect('/api/auth/google-login-success');
        });
/*
            {
                successRedirect: '/api/auth/google-login-success',
                failureRedirect: '/api/auth/google-login-failure'
            }));
*/
    loginRouter.get('/google-login-success',function (req,res) {
        user.sendResponse(true, res);
    });
    loginRouter.get('/google-login-failure',function (req,res) {
        user.sendResponse(false, res);
    });

//////////////////////////////
    loginRouter.get('/logout', function (req, res) {
        delete req.session.displayName;
        req.session.save (function() {
            return user.sendResponse(true, res);
        });
    });


    return loginRouter;
};
