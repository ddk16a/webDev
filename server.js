//npm install express ejs express-session socket.io mysql

//getting stuffs
const express = require('express');
const path = require('path');
const parser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql');

let con = mysql.createConnection({
	host: 'localhost',
	user: 'game',
	password: 'webdev',
	database: 'game'
});

con.connect((err) => {
	if (err) throw err;
	console.log('connected to database');
});

//setting up server
const app = express();
app.set('views', __dirname);
app.set('view engine', 'ejs');
const server = app.listen(80,() => console.log('Server started'));

//midwares
app.use(express.static(path.join(__dirname, 'js')));
app.use(session({ secret: 'hip-hop turkey', resave: false, saveUninitialized: true }));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

//filter
app.use('/*', (req, resp, next) => {
	if (req.session.user || req.originalUrl == '/login' || req.originalUrl == '/sign-in')
		next();
	else
		resp.redirect('/login');
});

//url stuffs
app.get('/', (req, resp) => resp.redirect('/dashboard'));

app.get('/login', (req, resp) => resp.render('login.ejs'));

app.post('/login', (req, resp) => {
	let username = req.body.username, password = req.body.password;
	let sql = "select * from users where username = ? and password = ?";
	con.query(sql, [username, password], (err, result) => {
		if (err) throw err;
		if (result.length == 1) {
			req.session.user = result[0];
			resp.redirect('/dashboard');
		}
		else
			resp.redirect('/login');
	});
});

app.get('/sign-up', (req, resp) => resp.render('sign-up.ejs'));

app.get('/dashboard', (res, resp) => resp.render('index.ejs'));

//sockets
const io = require('socket.io')(server);

let queued = null;

io.on('connect', (socket) => {
	socket.join('game', () => socket.broadcast.emit('pair'));

	socket.on('paired', () => {
		socket.broadcast.emit('paired');
	});

	socket.on('move', (piece, dest) => socket.broadcast.emit('updateBoard', piece, dest));
});

process.on('SIGINT', () => process.exit());

process.on('exit', (code) => con.end());