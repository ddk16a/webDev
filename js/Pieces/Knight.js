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
	white: new createjs.Graphics().f('#FFF').dr(22.5,10,15,5).dr(10,12.5,10,20).dr(10,35,50,5).dr(22.5,17.5,37.5,17.5).dr(40,40,20,7.5).dr(15,42.5,20,10).dr(10,55,50,5),
	black: new createjs.Graphics().f('#222').dr(22.5,10,15,5).dr(10,12.5,10,20).dr(10,35,50,5).dr(22.5,17.5,37.5,17.5).dr(40,40,20,7.5).dr(15,42.5,20,10).dr(10,55,50,5)
}

createjs.promote(Knight, "Piece");
