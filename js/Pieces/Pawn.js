import Piece from './Piece.js';
import Highlight from './Highlight.js';

//constructor
export default function Pawn(row, col, color) {
	this.Piece_constructor(row, col, color);
	this.graphics = Pawn.graphics[color];
	this._state = 'initial';
}
let p = createjs.extend(Pawn, Piece);

p.pattern = function() {
	if (this._state == 'initial')
		return [{ row: row + 1, col: col }, { row: row + 2, col: col }];
	return [{ row: row + 1, col: col }];
}

Pawn.graphics = {
	white: new createjs.Graphics().f('#FFF').setStrokeStyle(3).s("#000").drawCircle(35,35,30),
	black: new createjs.Graphics().f('#444').setStrokeStyle(3).s("#000").drawCircle(35,35,30)
}

createjs.promote(Pawn, "Piece");
