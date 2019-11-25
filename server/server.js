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
	if (req.session.username || req.originalUrl == '/login')
		next();
	else
		resp.redirect('/login');
});

//url stuffs
app.get('/', (req, resp) => resp.redirect('/dashboard'));

app.get('/login', (req, resp) => resp.render('login.ejs'));

app.post('/login', (req, resp) => {
	req.session.username = req.body.username;
	resp.redirect('/dashboard');
});

app.get('/dashboard', (req, resp) => resp.render('index.ejs', { username: req.session.user }));

const io = require('./socket.js')(server);
