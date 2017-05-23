"use strict";
const express = require("express");
const passport = require("passport");
const session = require("express-session");
class App {
    constructor() {
        this.app = express();
    }
    setSession(options) {
        this.app.use(session(options));
    }
    setPassport(strategy) {
        passport.use(strategy);
        passport.serializeUser((user, done) => { done(null, user); });
        passport.deserializeUser((user, done) => { done(null, user); });
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }
    setDocumentRoot(path) {
        this.app.use(express.static(path));
    }
    addRoute(path, route) {
        this.app.use(path, route.get());
    }
    start(port) {
        this.app.listen(port);
    }
}
module.exports = App;
