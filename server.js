var express = require('express');
var http = require('http');
var socketIO = require('socket.io');
var fs = require('fs');
var server, io;

var app = express();

app.get('/', function (req, res){
    res.sendFile(__dirname + '/index.html')
});

server = http.Server(app);
server.listen(8000);

io = socketIO(server);
io.on('connection', function(socket){
    socket.emit('greeting-from-server', {
        greeting: 'Hello Client'
    });
    socket.on('greeting-from-client', function(message){
        console.log(message);
    });
});