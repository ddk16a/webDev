import Piece from './Piece.js';
import Highlight from '../Utils/Highlight.js';
import Stage from '../Utils/Stage.js';

//constructor
export default function Queen(row, col, color) {
	this.Piece_constructor(row, col, color);
	this.graphics = Queen.graphics[color];
}
let p = createjs.extend(Queen, Piece);

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

	piece.fill(spaces, Queen.UP, Queen.LEFT);
	piece.fill(spaces, Queen.UP, Queen.RIGHT);
	piece.fill(spaces, Queen.DOWN, Queen.LEFT);
	piece.fill(spaces, Queen.DOWN, Queen.RIGHT);
	piece.fill(spaces, Queen.UP, 0);
	piece.fill(spaces, Queen.DOWN, 0);
	piece.fill(spaces, 0, Queen.LEFT);
	piece.fill(spaces, 0, Queen.RIGHT);

	return spaces;
}

Queen.graphics = {
	white: new createjs.Graphics().f('#FFF').dc(35,35,20).dc(50,20,10).dc(20,50,10),
	black: new createjs.Graphics().f('#444').dc(35,35,20).dc(50,20,10).dc(20,50,10)
}


Queen.RIGHT = 1;
Queen.LEFT = -1;
Queen.DOWN = 1;
Queen.UP = -1;

createjs.promote(Queen, "Piece");