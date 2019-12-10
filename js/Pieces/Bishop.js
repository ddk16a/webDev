import Piece from './Piece.js';
import Highlight from '../Utils/Highlight.js';
import Stage from '../Utils/Stage.js';

//constructor
export default function Bishop(row, col, color) {
	this.Piece_constructor(row, col, color);
	this.graphics = Bishop.graphics[color];
}
let p = createjs.extend(Bishop, Piece);

p.pattern = function() {
	let piece = Highlight.target;
	let spaces = [];
	
	piece.fill(spaces, Bishop.UP, Bishop.LEFT);
	piece.fill(spaces, Bishop.UP, Bishop.RIGHT);
	piece.fill(spaces, Bishop.DOWN, Bishop.LEFT);
	piece.fill(spaces, Bishop.DOWN, Bishop.RIGHT);

	return spaces;
}

p.fill = function(spaces, dr, dc) {
	let i = 0, j = 0;
	do {
		i += dr;
		j += dc;
		spaces.push({ row: this.row+i, col: this.col+j });
	}
	while (0 <= this.row+i && this.row+i < 8 && 0 <= this.col+j && this.col+j < 8 && !Stage.get(this.row+i, this.col+j));
}

Bishop.graphics = {
	white: new createjs.Graphics().f('#FFF').dr(27.5,10,15,5).dr(17.5,17.5,35,27.5).dr(25,47.5,20,5).dr(10,55,50,5),
	black: new createjs.Graphics().f('#222').dr(27.5,10,15,5).dr(17.5,17.5,35,27.5).dr(25,47.5,20,5).dr(10,55,50,5)
}


Bishop.RIGHT = 1;
Bishop.LEFT = -1;
Bishop.DOWN = 1;
Bishop.UP = -1;

createjs.promote(Bishop, "Piece");