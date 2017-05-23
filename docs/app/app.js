var API = (function () {
    function API() {
    }
    API.fetch = function (api) {
        return fetch('/api/' + api, { method: 'POST', credentials: 'include' }).then(function (result) {
            if (!result.ok) {
                throw false;
            }
            return result.json();
        });
    };
    return API;
}());
var App = (function () {
    function App() {
    }
    App.prototype.goodbye = function () { Goodbye(); };
    App.prototype.checkVersion = function () { return VersionCheck(); };
    App.prototype.init = function () {
        var _this = this;
        if (Version.vcode < 0) {
            this.checkVersion().then(function () { _this.initPage(); });
        }
        else {
            this.initPage();
        }
    };
    App.prototype.initPage = function () { };
    return App;
}());
var app = new App();
document.addEventListener('DOMContentLoaded', function () {
    app.init();
}, false);
