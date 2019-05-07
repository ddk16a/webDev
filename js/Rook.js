import Piece from './Piece.js';
import Highlight from './Highlight.js';

//constructor
export default function Rook(row, col, color) {
	this.Piece_constructor(row, col, color, Rook.pattern);
	this.graphics = Rook.graphics[color];
}
createjs.extend(Rook, Piece);

Rook.graphics = {
	white: new createjs.Graphics().f('#FFF').setStrokeStyle(3).s("#000").drawRect(5,5,60,60),
	black: new createjs.Graphics().f('#444').setStrokeStyle(3).s("#000").drawRect(5,5,60,60)
}

Rook.pattern = () => {
	let piece = Highlight.target;
	let tiles = new Array();
	for (let i = -7; i < 8; i++) {
		if(i != 0)
			tiles.push({ row: piece.row, col: piece.col+i });
	}
	tiles.push({ row: piece.row+1, col: piece.col});
	tiles.push({ row: piece.row-1, col: piece.col});
	return tiles;
};

createjs.promote(Rook, "Piece");
