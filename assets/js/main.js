//$(document).ready(function () {
//
//    var key = 32,
//        lastEvent,
//        heldKeys = {},
//        tempID = 0,
//        colors = ['#ff9b9b', '#fff'],
//        add,
//        audioElement = document.getElementById('lala'),
//        streaming = false,
//        video = document.querySelector('video'),
//        canvas = document.querySelector('canvas'),
//        width = 320,
//        height = 0,
//        socket = io();
//
//    function start(intervalSec) {
//        add = setInterval(intervalBackground, intervalSec);
//    }
//
//    function intervalBackground() {
//        $('body').css('background-color', colors[tempID]);
//        tempID = tempID + 1;
//        if (tempID > colors.length - 1) tempID = 0;
//    }
//
////    var debounceTweet = _.debounce(takepicture, 1000, false);
////    debounceTweet = _.bind(debounceTweet);
//
//    $(window).keydown(function (e) {
//        if (e.keyCode == key) {
//
//            if (lastEvent && lastEvent.keyCode == e.keyCode) {
//                return;
//            }
//
//            lastEvent = e;
//            $('#heart').show();
//            $('h1').hide();
//
//            start(50);
//
//            audioElement.play();
//            audioElement.addEventListener('ended', function () {
//                this.currentTime = 0;
//                this.play();
//            }, false);
//
//            takepicture();
//
//            return false;
//        }
//    });
//
//    $(window).keyup(function (e) {
//        if (e.keyCode == key) {
//            lastEvent = null;
//            $('h1').show();
//            $('#heart').hide();
//
//            audioElement.pause();
//            audioElement.currentTime = 0;
//
//            intervalSec = 50;
//            clearInterval(add);
//
//            $('body').css('background-color', '#ff9b9b');
//        }
//    });
//
//    navigator.getMedia = ( navigator.getUserMedia ||
//        navigator.webkitGetUserMedia ||
//        navigator.mozGetUserMedia ||
//        navigator.msGetUserMedia);
//
//    navigator.getMedia(
//        {
//            video: true,
//            audio: false
//        },
//        function (stream) {
//            if (navigator.mozGetUserMedia) {
//                video.mozSrcObject = stream;
//            } else {
//                var vendorURL = window.URL || window.webkitURL;
//                video.src = vendorURL.createObjectURL(stream);
//            }
//            video.play();
//        },
//        function (err) {
//            console.log("An error occured! " + err);
//        }
//    );
//
//    video.addEventListener('canplay', function (ev) {
//        if (!streaming) {
//            height = video.videoHeight / (video.videoWidth / width);
//            video.setAttribute('width', width);
//            video.setAttribute('height', height);
//            canvas.setAttribute('width', width);
//            canvas.setAttribute('height', height);
//            streaming = true;
//        }
//    }, false);
//
//
//    function takepicture() {
//        canvas.width = width;
//        canvas.height = height;
//        canvas.getContext('2d').drawImage(video, 0, 0, width, height);
//        var data = canvas.toDataURL('image/png');
//        console.log(data);
//        sendTweet(data);
//    }
//
//    function sendTweet(pic) {
//        console.log(pic);
//        socket.emit('upload', pic);
//    }
//});
