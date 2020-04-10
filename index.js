const express = require('express');
const socket = require('socket.io');


//App setup
const app = express();
const server = app.listen(4000, function() {
  console.log('listening on port 4000')
});

//static files
app.use(express.static('public'));

//socket setup
var io = socket(server);

//listen for connection, when connection is made to the server - the callback function fires
//the callback has an argument - socket - each client will have its own socket
io.on('connection', function(socket) {
  console.log('made socket connection', socket.id); //the socket.is different for each refresh

  //listen for the message from the client
  socket.on('chat', function(data) { // data- received from the client
    io.sockets.emit('chat', data); //we send it out to all the clients connected
  })
});
