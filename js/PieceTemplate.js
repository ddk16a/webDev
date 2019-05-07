// Template for piece creation

/*
 * Replace each instance of 'MyPiece' with the name of the piece
 * 
 * Replace '...' with the code that fills the 'tiles' array
*/

import Piece from './Piece.js';
import Highlight from './Highlight.js';

function MyPiece(row, col, color) {
	this.Piece_constructor(row, col, color, MyPiece.pattern);
	this.graphics = MyPiece.graphics[color];
}
createjs.extend(MyPiece, Piece);

//this defines the graphics for the Piece
MyPiece.graphics = {
	white: new createjs.Graphics().f('#AAA').drawCircle(35,35,30),
	black: new createjs.Graphics().f('#555').drawCircle(35,35,30)
}

//this is the function that makes movement work
//it returns an array with the coordinates of where the piece can currenty go
MyPiece.pattern = () => {
	let piece = Highlight.target;
	let tiles = new Array();

	// logic for determining where the piece 'MyPiece' can go
	// tiles should by filled with objects like { row: someInt, col: someInt }
	// objects can be added with 'tiles.push({ row: someInt, col: someInt })'
	...

	return tiles;
};

createjs.promote(MyPiece, "Piece");
