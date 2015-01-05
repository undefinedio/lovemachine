var MyApp = new Backbone.Marionette.Application();

MyApp.Person = Backbone.Model.extend({});
MyApp.Persons = Backbone.Collection.extend({
    model: MyApp.Person
});

MyApp.API = {
    Persons: new MyApp.Persons,
    Boy: '',
    Girl: '',
    Pic: '',
    Webcam: '',
    init: function () {
        this.showVideo();
        this.showHome();
    },
    showVideo: function () {
        var videoView = new MyApp.VideoView();
        videoView.render();
        MyApp.videoRegion.show(videoView);
        this.Webcam = MyApp.PhotoController.init();
    },
    showHome: function () {
        var startView = new MyApp.StartView({
            collection: this.Persons
        });

        startView.render();
        MyApp.mainRegion.show(startView);
    },
    showExplanation: function () {
        this.Boy = this.Persons.findWhere({sex: 'm'});
        this.Girl = this.Persons.findWhere({sex: 'f'});

        var explanationView = new MyApp.ExplanationView({
            boy: this.Boy,
            girl: this.Girl
        });

        $('.video-container').hide();
        MyApp.mainRegion.show(explanationView);
    },
    showCountdown: function () {
        var countdownView = new MyApp.CountdownView();
        MyApp.mainRegion.show(countdownView);
    },
    showLove: function () {
        var loveView = new MyApp.LoveView();
        loveView.render();
        MyApp.mainRegion.show(loveView);
        MyApp.LoveController.keyEvents(this.Webcam);
    },
    showPic: function () {
        console.log(this.Pic);

        var picView = new MyApp.PicView({
            pic: this.Pic,
            boy: this.Boy,
            girl: this.Girl
        });

        MyApp.mainRegion.show(picView);
    }
};

MyApp.LoveController = {
    keyEvents: function (webcam) {

        var key = 32,
            lastEvent,
            heldKeys = {},
            tempID = 0,
            colors = ['#ff9b9b', '#fff'],
            add,
            audioElement = document.getElementById('lala'),
            that = this;

        $(window).keydown(function (e) {
            if (e.keyCode == key) {

                if (lastEvent && lastEvent.keyCode == e.keyCode) {
                    return;
                }

                lastEvent = e;
                $('#heart').show();
                $('h1').hide();

                add = setInterval(function () {
                    $('body').css('background-color', colors[tempID]);
                    tempID = tempID + 1;
                    if (tempID > colors.length - 1) tempID = 0;
                }, 50);

                audioElement.play();
                audioElement.addEventListener('ended', function () {
                    this.currentTime = 0;
                    this.play();
                }, false);

                MyApp.PhotoController.takePic(webcam);

                return false;
            }
        });

        $(window).keyup(function (e) {
            console.log(e.keyCode);
            if (e.keyCode == key) {
                lastEvent = null;
                $('h1').show();
                $('#heart').hide();

                audioElement.pause();
                audioElement.currentTime = 0;

                clearInterval(add);

                $('body').css('background-color', '#ff9b9b');

                MyApp.API.showPic();
            }
        });
    }
};

MyApp.PhotoController = {
    init: function () {
        var streaming = false,
            width = 320,
            height = 240,
            canvas = document.querySelector('canvas'),
            video = document.querySelector('video');

        navigator.getMedia = ( navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);

        navigator.getMedia(
            {
                video: true,
                audio: false
            },
            function (stream) {
                if (navigator.mozGetUserMedia) {
                    video.mozSrcObject = stream;
                } else {
                    var vendorURL = window.URL || window.webkitURL;
                    video.src = vendorURL.createObjectURL(stream);
                }
                video.play();
            },
            function (err) {
                console.log("An error occured! " + err);
            }
        );

        video.addEventListener('canplay', function (ev) {
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth / width);
                video.setAttribute('width', width);
                video.setAttribute('height', height);
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                streaming = true;
            }
        }, false);

        var obj = {
            canvas: canvas,
            video: video,
            height: height,
            width: width
        };

        return obj;
    },
    takePic: function (webcam) {
        var pic,
            canvas = webcam.canvas,
            video = webcam.video;

        setTimeout(function () {
            canvas.width = 320;
            canvas.height = 240;
            canvas.getContext('2d').drawImage(video, 0, 0, 320, 240);
            pic = canvas.toDataURL('image/png');

            MyApp.API.Pic = pic;
        }, 500);
    },
    sendPic: function (pic) {
        var socket = io();
        socket.emit('upload', pic);
    }
};

MyApp.addRegions({
    mainRegion: '#main',
    videoRegion: '#video'
});




MyApp.addInitializer(function (options) {
    console.log('init');
    MyApp.API.init();
});

MyApp.on("initialize:after", function () {
    Backbone.history.start();
});

MyApp.start();

