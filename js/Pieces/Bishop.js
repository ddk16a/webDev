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
	while (Stage.range.includes(this.row) && Stage.range.includes(this.col) && !Stage.get(this.row+i, this.col+j));
}

Bishop.graphics = {
	white: new createjs.Graphics().f('#FFF').setStrokeStyle(3).s("#000").drawCircle(35,35,30),
	black: new createjs.Graphics().f('#444').setStrokeStyle(3).s("#000").drawCircle(35,35,30)
}


Bishop.RIGHT = 1;
Bishop.LEFT = -1;
Bishop.DOWN = 1;
Bishop.UP = -1;

createjs.promote(Bishop, "Piece");