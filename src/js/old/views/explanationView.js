'use strict';

var ExplanationView = Backbone.Marionette.ItemView.extend({
    serializeData: function () {
        return {
            boy: this.options.boy.toJSON(),
            girl: this.options.girl.toJSON()
        };
    },
    template: "#explanation-template",
    events: {
        "click .btn-next": "nextStep"
    },
    initialize: function () {
        this.render();
    },
    nextStep: function () {
        MyApp.API.showCountdown();
    }
});

module.export = ExplanationView;