import Piece from './Piece.js';
import Highlight from '../Utils/Highlight.js';
import Stage from '../Utils/Stage.js';

//constructor
export default function King(row, col, color) {
	this.Piece_constructor(row, col, color);
	this.graphics = King.graphics[color];
	this.king = true;
}
let p = createjs.extend(King, Piece);

p.pattern = function() {
	let piece = Highlight.target;
	let spaces = [];

	//for each of the surrounding the pieces
	for (let i = 0; i < 9; i++) {
		let r = piece.row + Math.floor(i/3) - 1;
		let c = piece.col + Math.floor(i%3) - 1;
		if (!Stage.get(r, c) || Stage.get(r, c).color != piece.color) //if empty or is an enemy peice
			spaces.push({ row: r, col: c });
	}
	return spaces;
}

King.graphics = {
	white: new createjs.Graphics().f('#FFF').dr(10,10,15,5).dr(27.5,10,15,5).dr(45,10,15,5).dr(10,17.5,50,5).dr(17.5,25,35,20).dr(25,47.5,20,5).dr(10,55,50,5),
	black: new createjs.Graphics().f('#444').dr(10,10,15,5).dr(27.5,10,15,5).dr(45,10,15,5).dr(10,17.5,50,5).dr(17.5,25,35,20).dr(25,47.5,20,5).dr(10,55,50,5)
}

createjs.promote(King, "Piece");
