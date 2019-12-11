import Pieces from '../Pieces/index.js';

//singleton object for the stage interactions
export default function Stage(canvasID) {
	if (Stage.instance)
		return Stage.instance;

	this.Stage_constructor(document.getElementById(canvasID));

	//make all the tiles
	var black = false;
	Stage.range.forEach((row) => {
		Stage.range.forEach((col) => {
			let tile = new createjs.Shape().set({ x: 70*col, y: 70*row });
			tile.color = (black ? '#667' : '#aab');
			tile.graphics.f(tile.color).dr(0,0,70,70);
			this.addChild(tile);
			black = !black;
		});
		black = !black;
	});

	Stage.instance = this;
}
let p = createjs.extend(Stage, createjs.Stage);

Stage.instance = null
Stage.range = [0, 1, 2, 3, 4, 5, 6, 7]; //width and height of the board
Stage.invert = (thing) => { return 7 - thing; } //inverts the thing for different views
Stage.remove = (child) => Stage.instance.removeChild(child); //removes an object
Stage.add = (child) => { return Stage.instance.addChild(child); }; //adds a child to the stage
Stage.get = (row, col) => { return Stage.instance.getChildByName(row+':'+col); }; //retrieves an object on the stage
Stage.getInv = (row, col) => { return Stage.instance.getChildByName(Stage.invert(row)+':'+Stage.invert(col)); }; //retrieves an object on the stage
Stage.update = () => Stage.instance.update(); //updates the stage

Stage.queenify = (pawn) => {
	let row = pawn.row, col = pawn.col, color = pawn.color;
	Stage.remove(pawn);
	Stage.add(new Pieces.Queen(row, col, color));
}

//enables piece movement
Stage.startTurn = () => {
	Stage.instance.children.forEach((child) => {
		if (child.ally)
			child.setClick();
	});
}

//disables piece movement
Stage.endTurn = () => {
	Stage.instance.children.forEach((child) => {
		if (child.ally)
			child.unsetClick();
	});
}

//places all the pieces specified by the ally and the enemy arrays
p.setupBoard = function(player, ally, enemy) {
	let color = { one: player, two: (player!="white" ? "white":"black") }
	Stage.range.forEach((col) => {
		for (let row = 0; row < 2; row++) {
			let allyPiece = Pieces[ally[row][col]];
			let enemyPiece = Pieces[enemy[row][col]];
			this.addChild(new allyPiece(Stage.invert(row), (player=='white'? col : Stage.invert(col)), color.one)).setAlly(); //ally pieces
			this.addChild(new enemyPiece(row, (player=='white'? col : Stage.invert(col)), color.two)); //enemy pieces
		}
	});
}

createjs.promote(Stage, 'Stage');
