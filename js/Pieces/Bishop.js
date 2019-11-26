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
	let i = dr, j = dc;
	while (0 <= this.row+i && this.row+i < 8 && 0 <= this.col+j && this.col+j < 8 && !Stage.get(this.row+i, this.col+j)) {
		spaces.push({ row: this.row+i, col: this.col+j });
		i += dr;
		j += dc;
	}
	if (Stage.get(this.row+i, this.col+i) && Stage.get(this.row+i, this.col+i).color == this.color) //if we ran into a piece
		spaces.push({ row: this.row+i, col: this.col+i });
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