'use strict';
var Backbone = require('backbone');
var template = require("../templates/start.hbs");

var StartView = Backbone.Marionette.ItemView.extend({
    template: template
});

module.exports = StartView;