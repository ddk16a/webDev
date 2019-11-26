import Piece from './Piece.js';
import Highlight from '../Utils/Highlight.js';

//constructor
export default function Pawn(row, col, color) {
	this.Piece_constructor(row, col, color);
	this.graphics = Pawn.graphics[color];
	this._state = 'initial';
}
let p = createjs.extend(Pawn, Piece);

p.pattern = function() {
	let piece = Highlight.target;
	if (piece._state == 'initial')
		return [{ row: piece.row + 1, col: piece.col }, { row: piece.row + 2, col: piece.col }];
	return [{ row: piece.row + 1, col: piece.col }];
}

Pawn.graphics = {
	white: new createjs.Graphics().f('#FFF').setStrokeStyle(3).s("#000").drawCircle(35,35,30),
	black: new createjs.Graphics().f('#444').setStrokeStyle(3).s("#000").drawCircle(35,35,30)
}

createjs.promote(Pawn, "Piece");
