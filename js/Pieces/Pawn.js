import Piece from './Piece.js';
import Highlight from '../Utils/Highlight.js';
import Stage from '../Utils/Stage.js';

//constructor
export default function Pawn(row, col, color) {
	this.Piece_constructor(row, col, color);
	this.graphics = Pawn.graphics[color];
	this.state = 'initial';
	this.initRow = row;
}
let p = createjs.extend(Pawn, Piece);

p.pattern = function() {
	let piece = Highlight.target;
	let spaces = [];
	if (!Stage.get(piece.row - 1, piece.col)) {
		spaces.push({ row: piece.row - 1, col: piece.col });
		if (piece.state == 'initial' && !Stage.get(piece.row - 2, piece.col))
			spaces.push({ row: piece.row - 2, col: piece.col });
	}
	if (Stage.get(piece.row - 1, piece.col - 1))
		spaces.push({ row: piece.row - 1, col: piece.col - 1 });
	if (Stage.get(piece.row - 1, piece.col + 1))
		spaces.push({ row: piece.row - 1, col: piece.col + 1 });
	return spaces;
}

p.moved = async function() {
	this.state = 'moved';
	if ((this.initRow == 1 && this.row == 7) || (this.initRow == 6 && this.row == 0))
		Stage.queenify(this);
}

Pawn.graphics = {
	white: new createjs.Graphics().f('#FFF').dr(17.5,10,35,35).dr(25,47.5,20,5).dr(10,55,50,5),
	black: new createjs.Graphics().f('#222').dr(17.5,10,35,35).dr(25,47.5,20,5).dr(10,55,50,5)
}

createjs.promote(Pawn, "Piece");
