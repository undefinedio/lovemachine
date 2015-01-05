'use strict';

var LoveView = Backbone.Marionette.CompositeView.extend({
    template: "#love-template",
    initialize: function () {
        this.render();
    },
    nextStep: function () {
        console.log('love-view');
    }
});

module.export = LoveView;