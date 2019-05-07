//getting stuffs
const express = require('express');
const path = require('path');
const parser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql');

const connection_options = {
	host: 'us-cdbr-iron-east-02.cleardb.net',
	user: 'be494343c33e7e',
	password: '3bc88f84',
	database: 'heroku_84de5b81bf6af34'
}

//setting up server
const app = express();
app.set('views', __dirname);
app.set('view engine', 'ejs');
const server = app.listen((process.env.PORT || 80),() => console.log('Server started'));

//midwares
app.use(express.static(path.join(__dirname, 'js')));
app.use(session({ secret: 'hip-hop turkey', resave: false, saveUninitialized: true }));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

//filter
app.use('/*', (req, resp, next) => {
	if (req.session.user || req.originalUrl == '/login' || req.originalUrl == '/newaccount')
		next();
	else
		resp.redirect('/login');
});

//url stuffs
app.get('/', (req, resp) => resp.redirect('/dashboard'));

app.get('/login', (req, resp) => resp.render('login.ejs'));

app.post('/login', (req, resp) => {
	let con = mysql.createConnection(connection_options);

	con.connect((err) => { if (err) throw err; });

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
		con.end();
	});
});

app.get('/sign-up', (req, resp) => resp.render('sign-up.ejs'));

app.get('/dashboard', (res, resp) => resp.render('index.ejs'));

app.get('/newaccount', (res, resp) => resp.render('newaccount.ejs'));

app.post('/newaccount', (req, resp) => {
	let username = req.body.username, password1 = req.body.password1, password2 = req.body.password2;
	if(password1 == password2){
		let con = mysql.createConnection(connection_options);

		con.connect((err) => { if (err) throw err; });

		let sql = "insert into users (username, password) values ( ? , ? );";
		con.query(sql, [username, password1], (err, result) => {
			if (err) throw err;
			if (result.affectedRows == 1) {
				let sql = "select * from users where username = ?";
				con.query(sql, [username], (err, result) => {
					if (err) throw err;
					if (result.length == 1) {
						req.session.user = result[0];
						resp.redirect('/dashboard');
					}else
						resp.redirect('/newaccount');
					con.end();
				});
			}else
				resp.redirect('/newaccount');
		});
	}else
	   resp.redirect('/newaccount');
});

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
});