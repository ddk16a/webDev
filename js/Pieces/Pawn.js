import Piece from './Piece.js';
import Highlight from '../Utils/Highlight.js';
import Stage from '../Utils/Stage.js';

//constructor
export default function Pawn(row, col, color) {
	this.Piece_constructor(row, col, color);
	this.graphics = Pawn.graphics[color];
	this._state = 'initial';
}
let p = createjs.extend(Pawn, Piece);

p.pattern = function() {
	let piece = Highlight.target;
	let spaces = [];
	if (!Stage.get(piece.row - 1, piece.col)) {
		spaces.push({ row: piece.row - 1, col: piece.col });
		if (piece._state == 'initial' && Stage.get(piece.row - 2, piece.col))
			spaces.push({ row: piece.row - 2, col: piece.col });
	}
	if (Stage.get(piece.row - 1, piece.col - 1))
		spaces.push({ row: piece.row - 1, col: piece.col - 1 });
	if (Stage.get(piece.row - 1, piece.col + 1))
		spaces.push({ row: piece.row - 1, col: piece.col + 1 });
	return spaces;
}

p.moveTo = function(row, col) {
	Stage.remove(Stage.get(row, col));
	this.x = col * 70;
	this.y = row * 70;
	this.col = col;
	this.row = row;
	this.name = row+":"+col;
	this._state = "has-moved";
}

Pawn.graphics = {
	white: new createjs.Graphics().f('#FFF').setStrokeStyle(3).s("#000").drawCircle(35,35,30),
	black: new createjs.Graphics().f('#444').setStrokeStyle(3).s("#000").drawCircle(35,35,30)
}

createjs.promote(Pawn, "Piece");
