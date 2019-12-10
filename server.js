//getting stuffs
const express = require('express');
const path = require('path');
const parser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql');

// const connection_options = {
// 	host: 'us-cdbr-iron-east-02.cleardb.net',
// 	user: 'be494343c33e7e',
// 	password: '3bc88f84',
// 	database: 'heroku_84de5b81bf6af34'
// }

//setting up server
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const server = app.listen((process.env.PORT || 80),() => console.log('Server started'));

//midwares
app.use(express.static(path.join(__dirname, 'js')));
app.use(session({ secret: 'hip-hop turkey', resave: false, saveUninitialized: true }));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

//filter
app.use('/*', (req, resp, next) => {
	if (req.session.username || req.originalUrl == '/login')
		next();
	else
		resp.redirect('/login');
});

//url stuffs
app.get('/', (req, resp) => resp.redirect('/waiting'));

app.get('/login', (req, resp) => resp.render('login.ejs'));

app.post('/login', (req, resp) => {
	req.session.username = req.body.username;
	resp.redirect('/waiting');
});

app.get('/quit', (req, resp) => {
	delete req.session;
	resp.redirect('/login');
});

app.get('/waiting', (req, resp) => resp.render('waiting.ejs', { username: req.session.username }));

app.get('/dashboard', (req, resp) => resp.render('index.ejs', { username: req.session.username, room: req.query.room, color: req.query.color }));

//sockets
const io = require('socket.io')(server);
const waitingio = io.of('/waiting'); //for those waiting for a match
const gameio = io.of('/game'); //for those playing the game

//waitingio stuff
	waitingio.queued = null;
	waitingio.on('connect', (socket) => {
		if (!waitingio.queued)
			waitingio.queued = socket.id;
		else {
			waitingio.to(`${waitingio.queued}`).to(`${socket.id}`).emit('paired', waitingio.queued);
			waitingio.queued = null; 
		}
		socket.on('disconnecting', () => {
			if (waitingio.queued == socket.id) waitingio.queued = null;
		});
	});


//gameio stuff
	gameio.on('connect', (socket) => {
		//to connect the two players who came together
		socket.on('identify', (room, name) => {
			socket.room = room;
			socket.join(room, () => gameio.to(room).emit('joined', name));
		});

		socket.on('ack', (name) => socket.to(socket.room).emit('ack', name));

		socket.on('paired', () => socket.broadcast.to(socket.room).emit('paired'));

		socket.on('move', (piece, dest) => socket.to(socket.room).emit('updateBoard', piece, dest));

		socket.on('lost', (color) => gameio.in(socket.room).emit('end', color));

		socket.on('disconnect', () => socket.to(socket.room).emit('quited'));
	});
