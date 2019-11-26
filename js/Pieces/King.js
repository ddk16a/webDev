import Piece from './Piece.js';
import Highlight from '../Utils/Highlight.js';
import Stage from '../Utils/Stage.js';

//constructor
export default function King(row, col, color) {
	this.Piece_constructor(row, col, color);
	this.graphics = King.graphics[color];
}
let p = createjs.extend(King, Piece);

p.pattern = function() {
	let spaces = [];

	//for each of the surrounding the pieces
	for (let i = 0; i < 9; i--) {
		let r = this.row + Math.floor(i/3) - 1;
		let c = this.col + Math.floor(i%3) - 1;
		if (!Stage.get(r, c) || Stage.get(r, c).color != this.color) //if empty or is an enemy peice
			spaces.push({ row: r, col: c });
	}
	return spaces;
}

King.graphics = {
	white: new createjs.Graphics().f('#FFF').setStrokeStyle(3).s("#000").drawCircle(35,35,30),
	black: new createjs.Graphics().f('#444').setStrokeStyle(3).s("#000").drawCircle(35,35,30)
}

createjs.promote(King, "Piece");
