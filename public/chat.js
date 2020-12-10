// make connection
// this is the socket for front end
const socket = io.connect('http://localhost:4000');

// starting querying the DOM and store some variables from html page
const messsage = document.getElementById('messsage');
const name = document.getElementById('name');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

// emit events when the button is clicked
btn.addEventListener('click', () => {
  socket.emit('chat', {
    // will emit a message down the socket to the server
    message: message.value, //the actual object that is sent
    name: name.value,
  });
});

message.addEventListener('keypress', () => {
  socket.emit('typing', name.value);
});
// listen for events from the server

socket.on('chat', (data) => {
  feedback.innerHTML = '';
  output.innerHTML +=
    '<p><strong>' + data.name + ': </strong>' + data.message + '</p>'; // output the data to the DOM
});

socket.on('typing', (data) => {
  feedback.innerHTML = '<p><em>' + data + 'is typing a message.. </em></p>';
});

/*
When we click send -> chat.js/btn.addEventListener - it's listening for that click
- grab the socket and emit a chat meesage -> send it to the server
- server (index.js/io.on - socket.on) - listens to all its sockets - when hear something
- fires the callback fuction
- io.sockets.emit() - grab all the sockets and emit that chat message then send it
- then in FE: put it on the chat window:
- client (chat.js/socket.on) socket.on - output.innerHTML - on the page
*/
