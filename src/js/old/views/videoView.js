'use strict';

var VideoView = Backbone.Marionette.CompositeView.extend({
    template: "#video-template",

    getCanvasContext: function () {
        return this.$el.find('canvas');
    }
});


module.export = VideoView;