import Piece from './Piece.js';
import Highlight from '../Utils/Highlight.js';
import Stage from '../Utils/Stage.js'

//constructor
export default function Rook(row, col, color, id) {
	this.Piece_constructor(row, col, color, id);
	this.graphics = Rook.graphics[color];
}
let p = createjs.extend(Rook, Piece);

p.fill = function(board, spaces, dr, dc) {
	let i = dr, j = dc;
	while (0 <= this.row+i && this.row+i < 8 && 0 <= this.col+j && this.col+j < 8 && !board(this.row+i, this.col+j)) {
		spaces.push({ row: this.row+i, col: this.col+j });
		i += dr;
		j += dc;
	}
	if (board(this.row+i, this.col+j) && board(this.row+i, this.col+j).color != this.color) //if we ran into a piece
		spaces.push({ row: this.row+i, col: this.col+i });
}

p.pattern = function() {
	let spaces = [];
	
	fill(spaces, Rook.UP, 0);
	fill(spaces, Rook.DOWN, 0);
	fill(spaces, 0, Rook.LEFT);
	fill(spaces, 0, Rook.RIGHT);

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
