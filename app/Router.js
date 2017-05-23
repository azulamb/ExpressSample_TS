"use strict";
const express = require("express");
class Router {
    constructor() {
        this.router = express.Router();
        this.addAPI();
    }
    addAPI() { }
    isAuthorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.status(401);
            res.json({ message: 'Authorized error.' });
            return;
        }
        next();
    }
    get() { return this.router; }
}
module.exports = Router;
