'use strict';

var PicView = Backbone.Marionette.CompositeView.extend({
    template: "#pic-template",
    initialize: function () {
        this.render();
        console.log(this.options.pic);
    },
    nextStep: function () {
        console.log('pic-view');
    },
    serializeData: function () {
        return {
            boy: this.options.boy.toJSON(),
            girl: this.options.girl.toJSON(),
            pic: this.options.pic
        };
    },
    events: {
        "click .btn-send": "sendToTwitter"
    },
    sendToTwitter: function () {
        MyApp.PhotoController.sendPic(this.options.pic);
    }
});

module.export = PicView;