var net = require('net');

var sockets = new Array;

var server = net.createServer(function (socket) {
  console.log("Client connected");
  socket.setTimeout(200, function(){
    sockets.splice(sockets.length, 1);
    socket.end();
    console.log("Client dead "+sockets.length);
  });
  sockets.push(socket);
  console.log("Clients size: "+sockets.length);
});

server.listen(1337, "127.0.0.1", function(){
  setInterval(function(){
    console.log("Beat... "+sockets.length+" clients");
    for(socket_index in sockets){
      var socket = sockets[socket_index];
      try{
        socket.write('alive?');
      }catch(err){
        console.log("Error on socket "+socket_index);
        sockets.splice(socket_index, 1);
        socket.end();
        console.log("Client dead "+sockets.length);
      }
    }
  }, 200);
});