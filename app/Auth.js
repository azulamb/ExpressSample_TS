"use strict";
const Router = require("./Router");
const passport = require("passport");
const session = require("express-session");
const Twitter = require("passport-twitter");
const RedisStore = require("connect-redis");
const Store = RedisStore(session);
class Auth extends Router {
    addAPI() {
        this.router.get('/logout', (req, res) => {
            if (req.session) {
                req.session.destroy();
            }
            res.redirect('/');
        });
        this.router.get('/twitter', passport.authenticate('twitter'));
        this.router.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/' }), (req, res, next) => {
            res.redirect('/app');
        });
    }
    addTwitterAuth(app, loginttl, port) {
        app.setSession({
            secret: process.env.SECRET_KEY || 'secret',
            resave: false,
            saveUninitialized: true,
            store: new Store({
                host: process.env.REDIS_HOST || '127.0.0.1',
                port: process.env.REDIS_PORT || 6379,
                prefix: 'sid:',
            }),
            cookie: {
                maxAge: (loginttl || 5 * 60) * 1000,
            },
        });
        app.setPassport(new Twitter.Strategy({
            consumerKey: process.env.TWITTER_CONSUMER_KEY || '',
            consumerSecret: process.env.TWITTER_CONSUMER_SECRET || '',
            callbackURL: (process.env.BASE_URL || (port && port !== 80 ? 'http://localhost:' + port + '/' : 'http://localhost/')) + 'auth/twitter/callback',
        }, (token, tokenSecret, profile, done) => {
            process.nextTick(() => {
                return done(null, { id: profile.id, token: 'testtoken' });
            });
        }));
    }
}
module.exports = Auth;
