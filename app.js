var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');


app.use(express.static(__dirname + '/'));

var Twitter = require('node-twitter');

var twitterRestClient = new Twitter.RestClient(
    'nUm55C0nd1TMpWp6VLLm8Ve1s',
    '8fclhAM5cNWB6HJ7UbiLrw5C5EdhTYJVxIkrpNZ1Eui6aTstY5',
    '2913731146-hfGuXikKM6lxx90bg4EDp2ehIDebywbO38qVgqi',
    'U7mv4GKo6ikitxXVr5XXZQn4EYmCeqd71gxiq9ySoWOMn'
);
/*******
 * DEFINE ROUTE
 *******/

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

/*******
 * LISTEN FOR SOCKET MESSAGES
 *******/

io.on('connection', function(socket){
    socket.on('upload', function(data) {
        var matches = data.match(/^data:.+\/(.+);base64,(.*)$/);
        var ext = matches[1];
        var base64_data = matches[2];
        var buffer = new Buffer(base64_data, 'base64');

        fs.writeFile(__dirname + '/pictures/img.png', buffer, function (err) {
            tweetPicture('/pictures/img.png');
        });
    });
});


function tweetPicture(imageName) {
    twitterRestClient.statusesUpdateWithMedia(
        {
            'status': 'It was love at first sight!',
            'media[]': imageName
        },
        function(error, result) {
            if (error) {
                console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
            }
            if (result) {
                console.log(result);
            }
        }
    );
}
/*******
 * START SERVER
 *******/

http.listen(3000, function(){
    console.log('listening on *:3000');
});