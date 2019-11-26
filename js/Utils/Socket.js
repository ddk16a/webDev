import Stage from './Stage.js';

let socket = io();

socket.on('connect', () => console.log('connected'));

var stage; 
var player; //the color of the player

socket.on('pair', () => {
	socket.emit('paired');
	(function() {
		player = 'white';
		stage = new Stage('myCanvas'); //pass in the canvas id to set up easeljs

		let ally = [
			['Rook','Knight','Bishop','Queen','King','Bishop','Knight','Rook'], //this is the bottom row
			['Pawn','Pawn','Pawn','Pawn','Pawn','Pawn','Pawn','Pawn'] //this is one above the bottom row
		];
		let enemy = [
			['Rook','Knight','Bishop','Queen','King','Bishop','Knight','Rook'], //this is the top row
			['Pawn','Pawn','Pawn','Pawn','Pawn','Pawn','Pawn','Pawn'] //this is one below the top row
		];

		stage.setupBoard(player, ally, enemy);

		stage.update();
	})();
});

socket.on('paired', () => {
	(function() {
		player = 'black';
		stage = new Stage('myCanvas'); //pass in the canvas id to set up easeljs

		let ally = [
			['Rook','Knight','Bishop','King','Queen','Bishop','Knight','Rook'], //this is the bottom row
			['Pawn','Pawn','Pawn','Pawn','Pawn','Pawn','Pawn','Pawn'] //this is one above the bottom row
		];
		let enemy = [
			['Rook','Knight','Bishop','King','Queen','Bishop','Knight','Rook'], //this is the top row
			['Pawn','Pawn','Pawn','Pawn','Pawn','Pawn','Pawn','Pawn'] //this is one below the top row
		];

		stage.setupBoard(player, ally, enemy);

		Stage.endTurn();
		stage.update();
	})();
});

socket.on('updateBoard', (piece, dest) => {
	let p = Stage.get(Stage.invert(dest.row), Stage.invert(dest.col));
	if (p) {
		if (p.king)
			socket.emit('lost', player);
		Stage.remove(p);
	}
	Stage.get(Stage.invert(piece.row), Stage.invert(piece.col)).moveTo(Stage.invert(dest.row), Stage.invert(dest.col));
	Stage.startTurn();
	Stage.update();
});

socket.on('end', (color) => {
	if (color == player)
		alert("you won! you are amazing");
	else
		alert("you lost. you suck");
});

export default socket;