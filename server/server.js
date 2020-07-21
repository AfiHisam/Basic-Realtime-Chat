const http = require('http');
const express = require('express');
const socketio = require('socket.io');

var usernames = [];

const app = express();

const clientPath = `${__dirname}/../client`;
console.log(`Serving static from ${clientPath}`);

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);


io.on('connection', (socket) => {

	// console.log(socket.id);
	// socket.emit('connect','Successfully connect to socket.io');

	


	socket.on('new user', (text, callback) => {

		// console.log(text);

		if(usernames.indexOf(text) != -1){
			callback(false);
		}else{

			callback(true);
			socket.uname = text;
			usernames.push(socket.uname);
			// console.log(usernames);
			io.emit('userlists',usernames);
		}

	});

	socket.on('send message', (text) => {

		// console.log(text);

		io.emit('receive message', {msg: text, name: socket.uname});

	});

	socket.on('disconnect', (text) => {

	if(!socket.uname) return;
	usernames.splice(usernames.indexOf(socket.uname), 1);
	io.emit('userlists',usernames);

	});


});






server.on('error', (err) => {
	console.error('Server error', err);
});

server.listen(3000, () => {
	console.log('server start at port 3000');
});



