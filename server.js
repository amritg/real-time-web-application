var http = require('http');
var socketIO = require('socket.io');
var fs = require('fs');
var server, io;

server = http.createServer(function(req, res){
    fs.readFile(__dirname+'/index.html', function(err, data){
        res.writeHead(200);
        res.end(data);
    });
});

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