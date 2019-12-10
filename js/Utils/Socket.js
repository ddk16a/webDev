import Stage from './Stage.js';

const stage = new Stage('myCanvas'); 
const player = $('#color').val(); //the color of the player

let socket = io('/game');
socket.on('connect', () => {
	socket.emit('identify', $('#room').val(), $('#username').html());

	let ally = [
		['Rook','Knight','Bishop','Queen','King','Bishop','Knight','Rook'], //this is the bottom row
		['Pawn','Pawn','Pawn','Pawn','Pawn','Pawn','Pawn','Pawn'] //this is one above the bottom row
	];
	let enemy = [
		['Rook','Knight','Bishop','Queen','King','Bishop','Knight','Rook'], //this is the top row
		['Pawn','Pawn','Pawn','Pawn','Pawn','Pawn','Pawn','Pawn'] //this is one below the top row
	];

	stage.setupBoard(player, ally, enemy);
	if (player == 'black')
		Stage.endTurn();

	stage.update();
});

socket.on('joined', (name, ack) => {
	if (name != $('#username').html()) {
		$('#opponent').html(name);
		socket.emit('ack', $('#username').html());
	}
});

socket.on('ack', (name) => $('#opponent').html(name));

socket.on('updateBoard', (piece, dest) => {
	console.log('here');
	Stage.remove(Stage.getInv(dest.row, dest.col));
	Stage.getInv(piece.row, piece.col).moveTo(Stage.invert(dest.row), Stage.invert(dest.col));
	Stage.startTurn();
	Stage.update();
});

socket.on('end', (color) => {
	if (color == player)
		alert('You win. And that\'s a good thing');
	else
		alert('You lose. That\'s pretty lame');
	window.location.replace((confirm('Would you like to play again?') ? 'waiting' : 'quit'))
});

socket.on('quited', () => {
	alert('they quit on you');
	window.location.replace('waiting');
});


export default socket;