import Piece from './Piece.js';
import Highlight from '../Utils/Highlight.js';
import Stage from '../Utils/Stage.js';

//constructor
export default function Knight(row, col, color) {
	this.Piece_constructor(row, col, color);
	this.graphics = Knight.graphics[color];
}
let p = createjs.extend(Knight, Piece);

p.pattern = function() {
	let piece = Highlight.target;
	let spaces = [];

	if (!Stage.get(piece.row+2, piece.col+1) || Stage.get(piece.row+2, piece.col+1).color != piece.color)
		spaces.push({ row: piece.row + 2, col: piece.col + 1 });
	if (!Stage.get(piece.row+2, piece.col-1) || Stage.get(piece.row+2, piece.col-1).color != piece.color)
		spaces.push({ row: piece.row+2, col: piece.col-1 });
	if (!Stage.get(piece.row-2, piece.col+1) || Stage.get(piece.row-2, piece.col+1).color != piece.color)
		spaces.push({ row: piece.row-2, col: piece.col+1 });
	if (!Stage.get(piece.row-2, piece.col-1) || Stage.get(piece.row-2, piece.col-1).color != piece.color)
		spaces.push({ row: piece.row-2, col: piece.col-1 });
	if (!Stage.get(piece.row+1, piece.col+2) || Stage.get(piece.row+1, piece.col+2).color != piece.color)
		spaces.push({ row: piece.row+1, col: piece.col+2 });
	if (!Stage.get(piece.row+1, piece.col-2) || Stage.get(piece.row+1, piece.col-2).color != piece.color)
		spaces.push({ row: piece.row+1, col: piece.col-2 });
	if (!Stage.get(piece.row-1, piece.col+2) || Stage.get(piece.row-1, piece.col+2).color != piece.color)
		spaces.push({ row: piece.row-1, col: piece.col+2 });
	if (!Stage.get(piece.row-1, piece.col-2) || Stage.get(piece.row-1, piece.col-2).color != piece.color)
		spaces.push({ row: piece.row-1, col: piece.col-2 });
	
	return spaces;
}

Knight.graphics = {
	white: new createjs.Graphics().f('#FFF').drawRect(25,15,20,40).drawRect(15,25,40,20),
	black: new createjs.Graphics().f('#444').drawRect(25,15,20,40).drawRect(15,25,40,20)
}

createjs.promote(Knight, "Piece");
