"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_google_oauth20_1 = require("passport-google-oauth20");
// import * as passport from 'passport';
const passport = require('passport');
const GOOGLE_CLIENT_ID = '13195484357-cn6p7k5v9odtk5fff1lj74iksf7s2iv0.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
passport.use(new passport_google_oauth20_1.Strategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/users/auth/google/callback',
}, function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    return done(null, profile);
}));
exports.default = passport;
