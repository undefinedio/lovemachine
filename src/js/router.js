'use strict';
var Backbone = require('backbone');

var Router = Backbone.Marionette.AppRouter.extend({
    initialize: function (options) {
        this.controller = options.controller;
    },

    appRoutes: {
        "*notFound": "start",
        "countdown": "countdown",
        "end": "end"
    }
});

module.exports = Router;