var express = require('express');
var http = require('http');
var socketIO = require('socket.io');
var fs = require('fs');
var server, io;
var sockets=[];

var app = express();

app.get('/', function (req, res){
    res.sendFile(__dirname + '/index.html')
});

server = http.Server(app);
server.listen(8000);

io = socketIO(server);
io.on('connection', function(socket){
    console.log('The socket connected');
    sockets.push(socket);
    
    socket.on('message', function(message){
        for(var i=0; i < sockets.length; i++){
            sockets[i].send(message);
        }
    });

    socket.on('disconnect', function(){
        console.log('The socket disconnected');
    });
});