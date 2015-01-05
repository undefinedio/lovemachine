'use strict';
var Backbone = require('backbone');
var template = require("../templates/layout.hbs");
var VideoView = require("./videoView");
var StartView = require("./startView");
var EndView = require("./endView");
var CountDownView = require("./countDownView");

var AppLayoutView = Backbone.Marionette.LayoutView.extend({
    template: template,

    el: "#js-container",

    views: {},

    initialize: function () {
        this.render();
        this.views.video = new VideoView();
        this.getRegion('video').show(this.views.video);
    },

    getCanvasContext : function () {
        this.views.video.getCanvasContext();
    },

    showStart: function () {
        this.getRegion('main').show(new StartView());
    },

    showCountDown: function () {
        this.getRegion('overlay').show(new CountDownView());
    },

    showEnd: function () {
        this.getRegion('main').show(new EndView());
    },

    regions: {
        main: "#js-main",
        video: "#js-video",
        overlay: "#js-overlay"
    }
});

module.exports = AppLayoutView;