//sockets
const io = require('socket.io')(server);

let queued = null;

io.on('connect', (socket) => {
	if (queued) {
		socket.room = queued.room;
		socket.join(socket.room, () => socket.broadcast.to(socket.room).emit('pair'));
		queued = null;
	}
	else {
		socket.room = socket.id;
		socket.join(socket.room);
		queued = socket;
	}

	socket.on('paired', () => socket.broadcast.to(socket.room).emit('paired'));

	socket.on('move', (piece, dest) => socket.broadcast.to(socket.room).emit('updateBoard', piece, dest));

	socket.on('lost', () => socket.to(socket.room).emit('end'));
});

module.exports = io;