import Piece from './Piece.js';
import Highlight from '../Utils/Highlight.js';
import Stage from '../Utils/Stage.js';

//constructor
export default function Queen(row, col, color) {
	this.Piece_constructor(row, col, color);
	this.graphics = Queen.graphics[color];
}
let p = createjs.extend(Queen, Piece);

p.fill = function(board, spaces, dr, dc) {
	let i = dr, j = dc;
	while (0 <= this.row+i && this.row+i < 8 && 0 <= this.col+j && this.col+j < 8 && !board(this.row+i, this.col+j)) {
		spaces.push({ row: this.row+i, col: this.col+j });
		i += dr;
		j += dc;
	}
	if (board(this.row+i, this.col+i) && board(this.row+i, this.col+i).color != this.color) //if we ran into a piece
		spaces.push({ row: this.row+i, col: this.col+i });
}

p.pattern = function() {
	let spaces = [];

	this.fill(spaces, Queen.UP, Queen.LEFT);
	this.fill(spaces, Queen.UP, Queen.RIGHT);
	this.fill(spaces, Queen.DOWN, Queen.LEFT);
	this.fill(spaces, Queen.DOWN, Queen.RIGHT);
	this.fill(spaces, Queen.UP, 0);
	this.fill(spaces, Queen.DOWN, 0);
	this.fill(spaces, 0, Queen.LEFT);
	this.fill(spaces, 0, Queen.RIGHT);

	return spaces;
}

Queen.graphics = {
	white: new createjs.Graphics().f('#FFF').setStrokeStyle(3).s("#000").drawCircle(35,35,30),
	black: new createjs.Graphics().f('#444').setStrokeStyle(3).s("#000").drawCircle(35,35,30)
}


Queen.RIGHT = 1;
Queen.LEFT = -1;
Queen.DOWN = 1;
Queen.UP = -1;

createjs.promote(Queen, "Piece");