import Pieces from './Pieces.js';

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
			tile.color = (black ? '#b58863' : '#f0d9b5');
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
Stage.remove = (child) => Stage.instance.removeChild(child); //removes an object
Stage.add = (child) => { return Stage.instance.addChild(child); }; //adds a child to the stage
Stage.get = (row, col) => { return Stage.instance.getChildByName(row+':'+col); }; //retrieves an object on the stage
Stage.update = () => Stage.instance.update(); //updates the stage
Stage.invert = (row) => { return 7 - row; } //inverts the row for different views

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
			this.addChild(new allyPiece(Stage.invert(row), col, color.one)).setAlly(); //ally pieces
			this.addChild(new enemyPiece(row, col, color.two)); //enemy pieces
		}
	});
}

createjs.promote(Stage, 'Stage');
