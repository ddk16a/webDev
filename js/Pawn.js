import Piece from './Piece.js';
import Highlight from './Highlight.js';

//constructor
export default function Pawn(row, col, color) {
	this.Piece_constructor(row, col, color, Pawn.pattern);
	this.graphics = Pawn.graphics[color];
}
createjs.extend(Pawn, Piece);

Pawn.graphics = {
	white: new createjs.Graphics().f('#FFF').setStrokeStyle(3).s("#000").drawCircle(35,35,30),
	black: new createjs.Graphics().f('#444').setStrokeStyle(3).s("#000").drawCircle(35,35,30)
}

Pawn.pattern = () => {
	let piece = Highlight.target;
	let tiles = new Array();
	[0,1,2,3,5,7].forEach((dir) => tiles.push({ row: piece.row+Math.floor(dir/3)-1, col: piece.col+(dir%3)-1 }));
	return tiles;
};

createjs.promote(Pawn, "Piece");
