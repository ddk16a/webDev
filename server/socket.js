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
	
	// socket.on('lose', (color) => socket.to(socket.room).emit("gameover", color));
	
	// socket.on('gameclose', (id, status) => {
	// 	console.log("Player " + id + " called gameclose()");
	// 	let con = mysql.createConnection(connection_options);
	// 	con.connect((err) => { if (err) throw err; });
	// 	let sql;
	// 	if(status == "won")
	// 		sql = "update users set wins = wins + 1 where id = ?;";
	// 	if(status == "lost")
	// 		sql = "update users set losses = losses + 1 where id = ?;";
	// 	con.query(sql, [id], (err, result) => {
	// 		if (err) throw err;
	// 		con.end();
	// 	});	
	// });
});

module.exports = io;