'use strict';
var Marionette = require('backbone.marionette');

var Controller = Marionette.Controller.extend({
    initialize: function (options) {
        this.layout = options.layout;
    },

    start: function () {
        this.layout.showStart();
    },

    countdown: function () {
        this.layout.showCountdown();
    },

    end: function () {
        this.layout.showEnd();
    },

    takePicture: function () {
        var canvas = this.layout.getCanvasContext();
        var image = picture.fromCanvas(canvas);
        socket.send('image' , image);
    }
});


module.exports = Controller;