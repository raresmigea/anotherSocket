//make connection
//this is the socket for the FE
const socket = io.connect('http://localhost:4000');

//starting querying the DOM and store some variables from html page
const messsage = document.getElementById('messsage');
const name = document.getElementById('name');
const btn = document.getElementById('send');
const output = document.getElementById('output');

//emit events when the button is clicked
btn.addEventListener('click', function() {
  socket.emit('chat', {// will emit a message down the socket to the server
    message: message.value, //the actual object that is sent
    handle: name.value
  });
});

//listen for events from the server

socket.on('chat', function(data) {
  output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>'; //output the data to the DOM
})
