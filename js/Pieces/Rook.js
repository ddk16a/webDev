import Piece from './Piece.js';
import Highlight from '../Utils/Highlight.js';
import Stage from '../Utils/Stage.js'

//constructor
export default function Rook(row, col, color) {
	this.Piece_constructor(row, col, color);
	this.graphics = Rook.graphics[color];
}
let p = createjs.extend(Rook, Piece);

p.fill = function(spaces, dr, dc) {
	let i = 0, j = 0;
	do {
		i += dr;
		j += dc;
		spaces.push({ row: this.row+i, col: this.col+j });
	}
	while (0 <= this.row+i && this.row+i < 8 && 0 <= this.col+j && this.col+j < 8 && !Stage.get(this.row+i, this.col+j));
}

p.pattern = function() {
	let piece = Highlight.target;
	let spaces = [];
	
	piece.fill(spaces, Rook.UP, 0);
	piece.fill(spaces, Rook.DOWN, 0);
	piece.fill(spaces, 0, Rook.LEFT);
	piece.fill(spaces, 0, Rook.RIGHT);

	return spaces;
}

Rook.graphics = {
	white: new createjs.Graphics().f('#FFF').setStrokeStyle(3).s("#000").drawRect(5,5,60,60),
	black: new createjs.Graphics().f('#444').setStrokeStyle(3).s("#000").drawRect(5,5,60,60)
}

Rook.RIGHT = 1;
Rook.LEFT = -1;
Rook.DOWN = 1;
Rook.UP = -1;

createjs.promote(Rook, "Piece");
