'use strict';
var Backbone = require('backbone');
var template = require("../templates/video.hbs");

var VideoView = Backbone.Marionette.ItemView.extend({
    template: template,

    getCanvasContext : function () {
        return this.$el.find('canvas')[0].getContext("2d");
    }
});

module.exports = VideoView;