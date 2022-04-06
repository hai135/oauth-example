import { AuthService } from './../service/AuthService';
import { Container } from 'typedi';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
// const LocalStrategy = require('passport-local').Strategy;
import { UserService } from '../service/UserService';
import passport from 'passport';

// const passport = require('passport');
const GOOGLE_CLIENT_ID =
    '13195484357-cn6p7k5v9odtk5fff1lj74iksf7s2iv0.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3001/users/auth/google/callback',
        },
        async function (accessToken, refreshToken, profile, done) {
            const user = profile as any;
            const existUser = await Container.get(UserService).getByEmail(
                user._json.email
            );
            if (!existUser) {
                Container.get(AuthService).signup(
                    user._json.name,
                    user._json.email,
                    Math.random().toString(2).slice(-8),
                    undefined,
                    user._json.locale
                );
            }
            return done(null, profile);
        }
    )
);

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
            session: false,
        },
        function verify(req, email, password, done) {
            console.log(req);
            console.log(email);
            console.log(password);
            done(null, { name: 'abc' });
        }
    )
);

export default passport;
