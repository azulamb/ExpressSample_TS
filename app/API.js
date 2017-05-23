"use strict";
const Router = require("./Router");
const Info = require('../config.json');
class API extends Router {
    addAPI() {
        this.router.get('/', this.isAuthorized, this.version);
        this.router.post('/', this.isAuthorized, this.version);
        this.router.get('/echo/:val', this.isAuthorized, (req, res, next) => {
            res.json({ message: 'Get value: ' + req.params.val, value: req.params.val });
        });
    }
    version(req, res, next) {
        console.log('version:', req.session);
        res.json(Info);
    }
}
module.exports = API;
