'use strict';

var StartView = Backbone.Marionette.CompositeView.extend({
    template: "#start-template",
    events: {
        "click .btn-next": "nextStep"
    },
    initialize: function () {
        this.render();
    },
    addNames: function () {
        this.collection.add(new MyApp.Person({sex: 'm', name: $('._boy').val()}));
        this.collection.add(new MyApp.Person({sex: 'f', name: $('._girl').val()}));
    },
    nextStep: function () {
        console.log('next-step');
        this.addNames();
        MyApp.API.showExplanation();
    }
});

module.export = StartView;