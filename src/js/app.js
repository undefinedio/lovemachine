// Get library packages
var _ = require('underscore');
var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var Marionette = require('backbone.marionette');

var Router = require('./router');
var Controller = require('./controller');
var AppLayoutView = require('./views/appLayoutView');

// Create app
var app = new Backbone.Marionette.Application();

app.addInitializer(function () {
    var layout = new AppLayoutView();

    var controller = new Controller({
        layout: layout
    });

    var router = new Router({
        controller: controller
    });

    Backbone.history.start();
});

app.start();