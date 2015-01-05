'use strict';

var CountdownView = Backbone.Marionette.ItemView.extend({
    template: "#countdown-template",
    initialize: function () {
        this.render();
    },
    onRender: function () {
        this.startCountDown();
    },
    startCountDown: function () {
        var count = 3,
            that = this,
            timer = this.$el.find('.timer');

        timer.html(count);

        var counter = setInterval(function () {

            count = count - 1;

            if (count <= 0) {
                that.nextStep();
                clearInterval(counter);
            }

            timer.html(count);

        }, 1000);
    },
    nextStep: function () {
        MyApp.API.showLove();
    }
});

module.export = CountdownView;